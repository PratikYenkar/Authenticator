import { Account } from '../types';

// Base32 decode (RFC 4648)
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(input: string): Uint8Array {
  const str = input.toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
  const output = new Uint8Array(Math.floor((str.length * 5) / 8));
  let bits = 0;
  let value = 0;
  let index = 0;

  for (let i = 0; i < str.length; i++) {
    const charIdx = BASE32_ALPHABET.indexOf(str[i]);
    if (charIdx === -1) {
      throw new Error('Invalid base32 character: ' + str[i]);
    }
    value = (value << 5) | charIdx;
    bits += 5;
    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 0xff;
      bits -= 8;
    }
  }
  return output;
}

// Convert number to 8-byte big-endian
function counterToBytes(counter: number): Uint8Array {
  const bytes = new Uint8Array(8);
  let v = counter;
  for (let i = 7; i >= 0; i--) {
    bytes[i] = v & 0xff;
    v = Math.floor(v / 256);
  }
  return bytes;
}

// Pure JS SHA-1 implementation
function sha1(message: Uint8Array): Uint8Array {
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;

  const msgLen = message.length;
  const bitLen = msgLen * 8;
  // Padding
  const paddedLen = Math.ceil((msgLen + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(message);
  padded[msgLen] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(paddedLen - 4, bitLen & 0xffffffff, false);

  const w = new Uint32Array(80);
  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    for (let i = 0; i < 16; i++) {
      w[i] = dv.getUint32(chunk + i * 4, false);
    }
    for (let i = 16; i < 80; i++) {
      const v = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
      w[i] = ((v << 1) | (v >>> 31)) >>> 0;
    }

    let a = h0; let b = h1; let c = h2; let d = h3; let e = h4;

    for (let i = 0; i < 80; i++) {
      let f: number;
      let k: number;
      if (i < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
      else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }

      const temp = (((a << 5) | (a >>> 27)) + f + e + k + w[i]) >>> 0;
      e = d; d = c;
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a; a = temp;
    }

    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
  }

  const result = new Uint8Array(20);
  const rv = new DataView(result.buffer);
  rv.setUint32(0, h0, false);
  rv.setUint32(4, h1, false);
  rv.setUint32(8, h2, false);
  rv.setUint32(12, h3, false);
  rv.setUint32(16, h4, false);
  return result;
}

// HMAC implementation
function hmacSHA1(key: Uint8Array, message: Uint8Array): Uint8Array {
  const BLOCK_SIZE = 64;
  let k = key;
  if (k.length > BLOCK_SIZE) {
    k = sha1(k);
  }
  if (k.length < BLOCK_SIZE) {
    const padded = new Uint8Array(BLOCK_SIZE);
    padded.set(k);
    k = padded;
  }

  const opad = new Uint8Array(BLOCK_SIZE);
  const ipad = new Uint8Array(BLOCK_SIZE);
  for (let i = 0; i < BLOCK_SIZE; i++) {
    opad[i] = k[i] ^ 0x5c;
    ipad[i] = k[i] ^ 0x36;
  }

  const inner = new Uint8Array(BLOCK_SIZE + message.length);
  inner.set(ipad);
  inner.set(message, BLOCK_SIZE);

  const innerHash = sha1(inner);

  const outer = new Uint8Array(BLOCK_SIZE + 20);
  outer.set(opad);
  outer.set(innerHash, BLOCK_SIZE);

  return sha1(outer);
}

function dynamicTruncate(h: Uint8Array, digits: number): string {
  const offset = h[h.length - 1] & 0x0f;
  const code =
    ((h[offset] & 0x7f) << 24) |
    ((h[offset + 1] & 0xff) << 16) |
    ((h[offset + 2] & 0xff) << 8) |
    (h[offset + 3] & 0xff);
  return String(code % Math.pow(10, digits)).padStart(digits, '0');
}

function computeTOTP(secret: string, digits: number, period: number): string {
  const keyBytes = base32Decode(secret);
  const counter = Math.floor(Date.now() / 1000 / period);
  const h = hmacSHA1(keyBytes, counterToBytes(counter));
  return dynamicTruncate(h, digits);
}

export function parseOtpAuthUri(uri: string): Partial<Account> | null {
  try {
    const url = new URL(uri);
    if (url.protocol !== 'otpauth:') return null;
    if (url.host !== 'totp') return null;

    const label = decodeURIComponent(url.pathname.slice(1));
    const params = url.searchParams;
    const secret = params.get('secret')?.toUpperCase().replace(/\s/g, '');

    if (!secret || !isValidBase32(secret)) return null;

    const issuer =
      params.get('issuer') ||
      (label.includes(':') ? label.split(':')[0] : label) ||
      'Unknown';
    const accountName = label.includes(':') ? label.split(':')[1].trim() : label;

    const algorithm = params.get('algorithm') as 'SHA1' | 'SHA256' | 'SHA512' | null;
    const digits = Number(params.get('digits') || 6);
    const period = Number(params.get('period') || 30);

    return {
      issuer: issuer.trim(),
      accountName: accountName.trim(),
      secret,
      algorithm: (algorithm ?? 'SHA1') as 'SHA1' | 'SHA256' | 'SHA512',
      digits: (digits === 8 ? 8 : 6) as 6 | 8,
      period: (period === 60 ? 60 : 30) as 30 | 60,
    };
  } catch {
    return null;
  }
}

export function generateTOTP(account: Account): string {
  try {
    return computeTOTP(account.secret, account.digits, account.period);
  } catch {
    return '------';
  }
}

export function formatCode(code: string, digits: number = 6): string {
  const mid = Math.floor(digits / 2);
  return code.slice(0, mid) + ' ' + code.slice(mid);
}

export function getTimeRemaining(period: number = 30): number {
  return period - (Math.floor(Date.now() / 1000) % period);
}

export function getProgress(period: number = 30): number {
  return getTimeRemaining(period) / period;
}

export function isValidBase32(secret: string): boolean {
  return (
    /^[A-Z2-7]+=*$/i.test(secret.replace(/\s/g, '')) &&
    secret.replace(/\s/g, '').replace(/=+$/, '').length >= 8
  );
}
