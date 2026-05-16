import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconLib = 'fa5' | 'mci';

interface BrandConfig {
  lib: IconLib;
  icon: string;
  bg: string;
  fg: string;
  brand?: boolean;
  domain?: string;
  localImage?: ImageSourcePropType;
  imageScale?: number; // override the default 0.72 fill ratio for local images
}

const LOCAL_LOGOS: Record<string, ImageSourcePropType> = {
  google:    require('../assets/Google_Favicon_2025.svg.png'),
  facebook:  require('../assets/Facebook-Logosu.png'),
  snapchat:  require('../assets/snapchat-logo-banner-15.png'),
  instagram: require('../assets/Instagram-logo.png'),
};

const BRAND_MAP: Record<string, BrandConfig> = {
  google:       { lib: 'fa5', icon: 'google',           bg: '#FFFFFF', fg: '#4285F4', brand: true,  domain: 'google.com' },
  gmail:        { lib: 'fa5', icon: 'google',           bg: '#EA4335', fg: '#fff', brand: true,  domain: 'gmail.com' },
  facebook:     { lib: 'fa5', icon: 'facebook-f',       bg: '#1877F2', fg: '#fff', brand: true,  domain: 'facebook.com' },
  twitter:      { lib: 'fa5', icon: 'twitter',          bg: '#1DA1F2', fg: '#fff', brand: true,  domain: 'twitter.com' },
  x:            { lib: 'fa5', icon: 'twitter',          bg: '#000000', fg: '#fff', brand: true,  domain: 'x.com' },
  github:       { lib: 'fa5', icon: 'github',           bg: '#24292E', fg: '#fff', brand: true,  domain: 'github.com' },
  instagram:    { lib: 'fa5', icon: 'instagram',        bg: 'transparent', fg: '#fff', brand: true,  domain: 'instagram.com', imageScale: 0.85 },
  discord:      { lib: 'fa5', icon: 'discord',          bg: '#5865F2', fg: '#fff', brand: true,  domain: 'discord.com' },
  microsoft:    { lib: 'fa5', icon: 'microsoft',        bg: '#00A4EF', fg: '#fff', brand: true,  domain: 'microsoft.com' },
  outlook:      { lib: 'fa5', icon: 'microsoft',        bg: '#0078D4', fg: '#fff', brand: true,  domain: 'outlook.com' },
  apple:        { lib: 'fa5', icon: 'apple',            bg: '#1C1C1E', fg: '#fff', brand: true,  domain: 'apple.com' },
  amazon:       { lib: 'fa5', icon: 'amazon',           bg: '#FF9900', fg: '#000', brand: true,  domain: 'amazon.com' },
  aws:          { lib: 'fa5', icon: 'aws',              bg: '#FF9900', fg: '#000', brand: true,  domain: 'aws.amazon.com' },
  dropbox:      { lib: 'fa5', icon: 'dropbox',          bg: '#0061FF', fg: '#fff', brand: true,  domain: 'dropbox.com' },
  twitch:       { lib: 'fa5', icon: 'twitch',           bg: '#9146FF', fg: '#fff', brand: true,  domain: 'twitch.tv' },
  linkedin:     { lib: 'fa5', icon: 'linkedin-in',      bg: '#0A66C2', fg: '#fff', brand: true,  domain: 'linkedin.com' },
  reddit:       { lib: 'fa5', icon: 'reddit-alien',     bg: '#FF4500', fg: '#fff', brand: true,  domain: 'reddit.com' },
  slack:        { lib: 'fa5', icon: 'slack',            bg: '#4A154B', fg: '#fff', brand: true,  domain: 'slack.com' },
  paypal:       { lib: 'fa5', icon: 'paypal',           bg: '#003087', fg: '#fff', brand: true,  domain: 'paypal.com' },
  spotify:      { lib: 'fa5', icon: 'spotify',          bg: '#1DB954', fg: '#fff', brand: true,  domain: 'spotify.com' },
  steam:        { lib: 'fa5', icon: 'steam',            bg: '#1B2838', fg: '#fff', brand: true,  domain: 'store.steampowered.com' },
  stripe:       { lib: 'fa5', icon: 'stripe-s',         bg: '#635BFF', fg: '#fff', brand: true,  domain: 'stripe.com' },
  wordpress:    { lib: 'fa5', icon: 'wordpress',        bg: '#21759B', fg: '#fff', brand: true,  domain: 'wordpress.com' },
  yahoo:        { lib: 'fa5', icon: 'yahoo',            bg: '#6001D2', fg: '#fff', brand: true,  domain: 'yahoo.com' },
  gitlab:       { lib: 'fa5', icon: 'gitlab',           bg: '#FC6D26', fg: '#fff', brand: true,  domain: 'gitlab.com' },
  bitbucket:    { lib: 'fa5', icon: 'bitbucket',        bg: '#0052CC', fg: '#fff', brand: true,  domain: 'bitbucket.org' },
  docker:       { lib: 'fa5', icon: 'docker',           bg: '#2496ED', fg: '#fff', brand: true,  domain: 'docker.com' },
  youtube:      { lib: 'fa5', icon: 'youtube',          bg: '#FF0000', fg: '#fff', brand: true,  domain: 'youtube.com' },
  snapchat:     { lib: 'fa5', icon: 'snapchat',         bg: '#FFFC00', fg: '#000', brand: true,  domain: 'snapchat.com', imageScale: 0.92 },
  whatsapp:     { lib: 'fa5', icon: 'whatsapp',         bg: '#25D366', fg: '#fff', brand: true,  domain: 'whatsapp.com' },
  telegram:     { lib: 'fa5', icon: 'telegram-plane',   bg: '#2CA5E0', fg: '#fff', brand: true,  domain: 'telegram.org' },
  adobe:        { lib: 'fa5', icon: 'adobe',            bg: '#FF0000', fg: '#fff', brand: true,  domain: 'adobe.com' },
  shopify:      { lib: 'fa5', icon: 'shopify',          bg: '#96BF48', fg: '#fff', brand: true,  domain: 'shopify.com' },
  playstation:  { lib: 'fa5', icon: 'playstation',      bg: '#003791', fg: '#fff', brand: true,  domain: 'playstation.com' },
  nintendo:     { lib: 'fa5', icon: 'nintendo-switch',  bg: '#E4000F', fg: '#fff', brand: true,  domain: 'nintendo.com' },
  netflix:      { lib: 'mci', icon: 'netflix',          bg: '#E50914', fg: '#fff',               domain: 'netflix.com' },
  bitcoin:      { lib: 'mci', icon: 'bitcoin',          bg: '#F7931A', fg: '#fff' },
  ethereum:     { lib: 'mci', icon: 'ethereum',         bg: '#627EEA', fg: '#fff' },
  coinbase:     { lib: 'mci', icon: 'currency-btc',     bg: '#0052FF', fg: '#fff',               domain: 'coinbase.com' },
  binance:      { lib: 'mci', icon: 'bitcoin',          bg: '#F3BA2F', fg: '#000',               domain: 'binance.com' },
  protonmail:   { lib: 'mci', icon: 'email-lock',       bg: '#6D4AFF', fg: '#fff',               domain: 'proton.me' },
  proton:       { lib: 'mci', icon: 'email-lock',       bg: '#6D4AFF', fg: '#fff',               domain: 'proton.me' },
  bitwarden:    { lib: 'mci', icon: 'shield-key',       bg: '#175DDC', fg: '#fff',               domain: 'bitwarden.com' },
  tesla:        { lib: 'mci', icon: 'car-electric',     bg: '#CC0000', fg: '#fff',               domain: 'tesla.com' },
  cloudflare:   { lib: 'mci', icon: 'cloud-check',      bg: '#F48120', fg: '#fff',               domain: 'cloudflare.com' },
  epic:         { lib: 'mci', icon: 'gamepad-variant',  bg: '#313131', fg: '#fff',               domain: 'epicgames.com' },
  epicgames:    { lib: 'mci', icon: 'gamepad-variant',  bg: '#313131', fg: '#fff',               domain: 'epicgames.com' },
  figma:        { lib: 'mci', icon: 'pencil-ruler',     bg: '#F24E1E', fg: '#fff',               domain: 'figma.com' },
  notion:       { lib: 'mci', icon: 'notebook',         bg: '#000000', fg: '#fff',               domain: 'notion.so' },
  evernote:     { lib: 'mci', icon: 'elephant',         bg: '#00A82D', fg: '#fff',               domain: 'evernote.com' },
  signal:       { lib: 'mci', icon: 'message-lock',     bg: '#3A76F0', fg: '#fff',               domain: 'signal.org' },
  digitalocean: { lib: 'mci', icon: 'server',           bg: '#0080FF', fg: '#fff',               domain: 'digitalocean.com' },
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
  let match: BrandConfig | null = null;
  if (BRAND_MAP[key]) match = BRAND_MAP[key];
  else {
    for (const k of Object.keys(BRAND_MAP)) {
      if (key.includes(k) || k.includes(key)) { match = BRAND_MAP[k]; break; }
    }
  }
  if (!match) return null;
  // Attach local image if we have one for this key (or the matched key)
  const matchedKey = BRAND_MAP[key] ? key : Object.keys(BRAND_MAP).find(k => key.includes(k) || k.includes(key)) ?? '';
  const localImage = LOCAL_LOGOS[matchedKey];
  return localImage ? { ...match, localImage } : match;
}

interface Props {
  issuer: string;
  size?: number;
  rounded?: boolean; // true = circle (home list), false = rounded square (guide list)
}

export default function ServiceLogo({ issuer, size = 44, rounded = true }: Props) {
  const [imgError, setImgError] = useState(false);
  const brand = getBrand(issuer);
  const borderRadius = rounded ? size / 2 : size * 0.22;
  const iconSize = size * 0.5;
  const bgColor = brand ? brand.bg : hashColor(issuer);

  const clearbitUrl = brand?.domain
    ? `https://logo.clearbit.com/${brand.domain}?size=${Math.round(size * 2)}`
    : null;

  const showLocal = !!brand?.localImage;
  const showClearbit = !showLocal && !rounded && clearbitUrl && !imgError;

  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius, backgroundColor: bgColor }]}>
      {showLocal ? (
        <Image
          source={brand!.localImage!}
          style={{ width: size * (brand!.imageScale ?? 0.72), height: size * (brand!.imageScale ?? 0.72) }}
          resizeMode="contain"
        />
      ) : showClearbit ? (
        <Image
          source={{ uri: clearbitUrl! }}
          style={[styles.img, { width: size, height: size, borderRadius }]}
          onError={() => setImgError(true)}
          resizeMode="contain"
        />
      ) : brand ? (
        brand.lib === 'fa5' ? (
          <FA5Icon name={brand.icon} size={iconSize} color={brand.fg} brand={brand.brand} />
        ) : (
          <MCIcon name={brand.icon} size={iconSize} color={brand.fg} />
        )
      ) : (
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>
          {issuer.charAt(0).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    position: 'absolute',
  },
  initial: {
    color: '#fff',
    fontFamily: 'Urbanist-Bold',
    includeFontPadding: false,
  },
});
