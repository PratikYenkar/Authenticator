export const validateBase32 = (secret: string): boolean =>
  /^[A-Z2-7]+=*$/i.test(secret.replace(/\s/g, '')) &&
  secret.replace(/\s/g, '').replace(/=+$/, '').length >= 8;

export const validateAccountName = (name: string): boolean =>
  name.trim().length >= 1 && name.trim().length <= 50;
