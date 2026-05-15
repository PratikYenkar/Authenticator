import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconLib = 'fa5' | 'mci';

interface BrandConfig {
  lib: IconLib;
  icon: string;
  bg: string;
  fg: string;
  brand?: boolean; // FA5 brand style flag
}

const BRAND_MAP: Record<string, BrandConfig> = {
  google:       { lib: 'fa5', icon: 'google',         bg: '#4285F4', fg: '#fff', brand: true },
  gmail:        { lib: 'fa5', icon: 'google',         bg: '#EA4335', fg: '#fff', brand: true },
  facebook:     { lib: 'fa5', icon: 'facebook-f',     bg: '#1877F2', fg: '#fff', brand: true },
  twitter:      { lib: 'fa5', icon: 'twitter',        bg: '#1DA1F2', fg: '#fff', brand: true },
  x:            { lib: 'fa5', icon: 'twitter',        bg: '#000000', fg: '#fff', brand: true },
  github:       { lib: 'fa5', icon: 'github',         bg: '#24292E', fg: '#fff', brand: true },
  instagram:    { lib: 'fa5', icon: 'instagram',      bg: '#E1306C', fg: '#fff', brand: true },
  discord:      { lib: 'fa5', icon: 'discord',        bg: '#5865F2', fg: '#fff', brand: true },
  microsoft:    { lib: 'fa5', icon: 'microsoft',      bg: '#00A4EF', fg: '#fff', brand: true },
  outlook:      { lib: 'fa5', icon: 'microsoft',      bg: '#0078D4', fg: '#fff', brand: true },
  apple:        { lib: 'fa5', icon: 'apple',          bg: '#1C1C1E', fg: '#fff', brand: true },
  amazon:       { lib: 'fa5', icon: 'amazon',         bg: '#FF9900', fg: '#000', brand: true },
  aws:          { lib: 'fa5', icon: 'aws',            bg: '#FF9900', fg: '#000', brand: true },
  dropbox:      { lib: 'fa5', icon: 'dropbox',        bg: '#0061FF', fg: '#fff', brand: true },
  twitch:       { lib: 'fa5', icon: 'twitch',         bg: '#9146FF', fg: '#fff', brand: true },
  linkedin:     { lib: 'fa5', icon: 'linkedin-in',    bg: '#0A66C2', fg: '#fff', brand: true },
  reddit:       { lib: 'fa5', icon: 'reddit-alien',   bg: '#FF4500', fg: '#fff', brand: true },
  slack:        { lib: 'fa5', icon: 'slack',          bg: '#4A154B', fg: '#fff', brand: true },
  paypal:       { lib: 'fa5', icon: 'paypal',         bg: '#003087', fg: '#fff', brand: true },
  spotify:      { lib: 'fa5', icon: 'spotify',        bg: '#1DB954', fg: '#fff', brand: true },
  steam:        { lib: 'fa5', icon: 'steam',          bg: '#1B2838', fg: '#fff', brand: true },
  stripe:       { lib: 'fa5', icon: 'stripe-s',       bg: '#635BFF', fg: '#fff', brand: true },
  wordpress:    { lib: 'fa5', icon: 'wordpress',      bg: '#21759B', fg: '#fff', brand: true },
  yahoo:        { lib: 'fa5', icon: 'yahoo',          bg: '#6001D2', fg: '#fff', brand: true },
  gitlab:       { lib: 'fa5', icon: 'gitlab',         bg: '#FC6D26', fg: '#fff', brand: true },
  bitbucket:    { lib: 'fa5', icon: 'bitbucket',      bg: '#0052CC', fg: '#fff', brand: true },
  docker:       { lib: 'fa5', icon: 'docker',         bg: '#2496ED', fg: '#fff', brand: true },
  youtube:      { lib: 'fa5', icon: 'youtube',        bg: '#FF0000', fg: '#fff', brand: true },
  snapchat:     { lib: 'fa5', icon: 'snapchat',       bg: '#FFFC00', fg: '#000', brand: true },
  whatsapp:     { lib: 'fa5', icon: 'whatsapp',       bg: '#25D366', fg: '#fff', brand: true },
  telegram:     { lib: 'fa5', icon: 'telegram-plane', bg: '#2CA5E0', fg: '#fff', brand: true },
  adobe:        { lib: 'fa5', icon: 'adobe',          bg: '#FF0000', fg: '#fff', brand: true },
  shopify:      { lib: 'fa5', icon: 'shopify',        bg: '#96BF48', fg: '#fff', brand: true },
  playstation:  { lib: 'fa5', icon: 'playstation',    bg: '#003791', fg: '#fff', brand: true },
  nintendo:     { lib: 'fa5', icon: 'nintendo-switch',bg: '#E4000F', fg: '#fff', brand: true },
  wordpress2:   { lib: 'fa5', icon: 'wordpress-simple', bg: '#21759B', fg: '#fff', brand: true },
  // MaterialCommunityIcons for brands not in FA5
  netflix:      { lib: 'mci', icon: 'netflix',        bg: '#E50914', fg: '#fff' },
  bitcoin:      { lib: 'mci', icon: 'bitcoin',        bg: '#F7931A', fg: '#fff' },
  ethereum:     { lib: 'mci', icon: 'ethereum',       bg: '#627EEA', fg: '#fff' },
  coinbase:     { lib: 'mci', icon: 'currency-btc',   bg: '#0052FF', fg: '#fff' },
  binance:      { lib: 'mci', icon: 'bitcoin',        bg: '#F3BA2F', fg: '#000' },
  protonmail:   { lib: 'mci', icon: 'email-lock',     bg: '#6D4AFF', fg: '#fff' },
  proton:       { lib: 'mci', icon: 'email-lock',     bg: '#6D4AFF', fg: '#fff' },
  bitwarden:    { lib: 'mci', icon: 'shield-key',     bg: '#175DDC', fg: '#fff' },
  tesla:        { lib: 'mci', icon: 'car-electric',   bg: '#CC0000', fg: '#fff' },
  cloudflare:   { lib: 'mci', icon: 'cloud-check',    bg: '#F48120', fg: '#fff' },
  epic:         { lib: 'mci', icon: 'gamepad-variant', bg: '#313131', fg: '#fff' },
  epicgames:    { lib: 'mci', icon: 'gamepad-variant', bg: '#313131', fg: '#fff' },
  figma:        { lib: 'mci', icon: 'pencil-ruler',   bg: '#F24E1E', fg: '#fff' },
  notion:       { lib: 'mci', icon: 'notebook',       bg: '#000000', fg: '#fff' },
  evernote:     { lib: 'mci', icon: 'elephant',       bg: '#00A82D', fg: '#fff' },
  avast:        { lib: 'mci', icon: 'shield-check',   bg: '#FF7800', fg: '#fff' },
  signal:       { lib: 'mci', icon: 'message-lock',   bg: '#3A76F0', fg: '#fff' },
  ubisoft:      { lib: 'mci', icon: 'controller-classic', bg: '#0070D1', fg: '#fff' },
  digitalocean: { lib: 'mci', icon: 'server',         bg: '#0080FF', fg: '#fff' },
};

const FALLBACK_COLORS = [
  '#5C6BC0', '#E53935', '#FB8C00', '#43A047',
  '#00897B', '#039BE5', '#8E24AA', '#D81B60',
];

function hashColor(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
  return FALLBACK_COLORS[Math.abs(h) % FALLBACK_COLORS.length];
}

function getBrand(issuer: string): BrandConfig | null {
  const key = issuer.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (BRAND_MAP[key]) return BRAND_MAP[key];
  for (const k of Object.keys(BRAND_MAP)) {
    if (key.includes(k) || k.includes(key)) return BRAND_MAP[k];
  }
  return null;
}

interface Props {
  issuer: string;
  size?: number;
}

export default function ServiceLogo({ issuer, size = 44 }: Props) {
  const brand = getBrand(issuer);
  const borderRadius = size / 2;
  const iconSize = size * 0.5;

  if (brand) {
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius, backgroundColor: brand.bg }]}>
        {brand.lib === 'fa5' ? (
          <FA5Icon name={brand.icon} size={iconSize} color={brand.fg} brand={brand.brand} />
        ) : (
          <MCIcon name={brand.icon} size={iconSize} color={brand.fg} />
        )}
      </View>
    );
  }

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius, backgroundColor: hashColor(issuer) }]}>
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>
        {issuer.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
  },
});
