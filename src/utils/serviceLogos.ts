export const SERVICE_COLORS: Record<string, string> = {
  facebook: '#1877F2',
  google: '#4285F4',
  gmail: '#EA4335',
  twitter: '#1DA1F2',
  x: '#000000',
  snapchat: '#FFFC00',
  instagram: '#E1306C',
  linkedin: '#0A66C2',
  github: '#181717',
  microsoft: '#00A4EF',
  apple: '#555555',
  amazon: '#FF9900',
  netflix: '#E50914',
  discord: '#5865F2',
  twitch: '#9146FF',
  reddit: '#FF4500',
  epic: '#313131',
  epicgames: '#313131',
  playstation: '#003791',
  tesla: '#CC0000',
  protonmail: '#6D4AFF',
  evernote: '#00A82D',
  avast: '#FF7800',
  dropbox: '#0061FF',
  binance: '#F3BA2F',
  coinbase: '#0052FF',
  default: '#6B7280',
};

export function getServiceColor(issuer: string): string {
  const key = issuer.toLowerCase().replace(/\s/g, '');
  const match = Object.entries(SERVICE_COLORS).find(([k]) => k !== 'default' && key.includes(k));
  return match ? match[1] : SERVICE_COLORS.default;
}

export function getServiceInitial(issuer: string): string {
  return issuer.charAt(0).toUpperCase();
}
