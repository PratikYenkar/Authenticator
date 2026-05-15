import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getServiceColor } from '../utils/serviceLogos';

const DOMAIN_MAP: Record<string, string> = {
  google: 'google.com',
  gmail: 'gmail.com',
  facebook: 'facebook.com',
  instagram: 'instagram.com',
  twitter: 'twitter.com',
  x: 'x.com',
  github: 'github.com',
  microsoft: 'microsoft.com',
  discord: 'discord.com',
  linkedin: 'linkedin.com',
  snapchat: 'snapchat.com',
  twitch: 'twitch.tv',
  reddit: 'reddit.com',
  dropbox: 'dropbox.com',
  amazon: 'amazon.com',
  netflix: 'netflix.com',
  apple: 'apple.com',
  paypal: 'paypal.com',
  coinbase: 'coinbase.com',
  binance: 'binance.com',
  protonmail: 'proton.me',
  evernote: 'evernote.com',
  avast: 'avast.com',
  playstation: 'playstation.com',
  tesla: 'tesla.com',
  epic: 'epicgames.com',
  epicgames: 'epicgames.com',
  shopify: 'shopify.com',
  stripe: 'stripe.com',
  slack: 'slack.com',
  notion: 'notion.so',
  figma: 'figma.com',
  adobe: 'adobe.com',
  spotify: 'spotify.com',
  gitlab: 'gitlab.com',
  cloudflare: 'cloudflare.com',
  digitalocean: 'digitalocean.com',
  wordpress: 'wordpress.com',
  yahoo: 'yahoo.com',
  outlook: 'microsoft.com',
  whatsapp: 'whatsapp.com',
  telegram: 'telegram.org',
  signal: 'signal.org',
  nintendo: 'nintendo.com',
  steam: 'steampowered.com',
  ubisoft: 'ubisoft.com',
};

function getDomain(issuer: string): string | null {
  const key = issuer.toLowerCase().replace(/\s/g, '');
  const entry = Object.entries(DOMAIN_MAP).find(([k]) => key.includes(k));
  return entry ? entry[1] : null;
}

interface Props {
  issuer: string;
  size?: number;
}

export default function ServiceLogo({ issuer, size = 44 }: Props) {
  const [imgError, setImgError] = useState(false);
  const domain = getDomain(issuer);
  const color = getServiceColor(issuer);
  const initial = issuer.charAt(0).toUpperCase();
  const borderRadius = size / 2;

  if (domain && !imgError) {
    return (
      <View style={[styles.logoWrap, { width: size, height: size, borderRadius }]}>
        <Image
          source={{ uri: `https://logo.clearbit.com/${domain}` }}
          style={{ width: size * 0.62, height: size * 0.62 }}
          resizeMode="contain"
          onError={() => setImgError(true)}
        />
      </View>
    );
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius, backgroundColor: color }]}>
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    includeFontPadding: false,
  },
});
