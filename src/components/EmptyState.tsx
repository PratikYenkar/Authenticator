import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path, Ellipse, G } from 'react-native-svg';
import { COLORS, SIZES } from '../constants/theme';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Svg width={220} height={180} viewBox="0 0 220 180">
        {/* Desk */}
        <Rect x="20" y="140" width="180" height="10" rx="4" fill="#E5E7EB" />
        {/* Laptop base */}
        <Rect x="55" y="110" width="110" height="35" rx="4" fill="#D1D5DB" />
        {/* Laptop screen */}
        <Rect x="60" y="70" width="100" height="45" rx="4" fill="#374151" />
        {/* Screen content */}
        <Rect x="68" y="78" width="60" height="5" rx="2" fill="#6B7280" />
        <Rect x="68" y="87" width="84" height="4" rx="2" fill="#4B5563" />
        <Rect x="68" y="95" width="50" height="4" rx="2" fill="#4B5563" />
        {/* Person head */}
        <Circle cx="110" cy="48" r="14" fill="#FDE68A" />
        {/* Person body */}
        <Ellipse cx="110" cy="75" rx="18" ry="12" fill="#BFDBFE" />
        {/* Shield */}
        <Path
          d="M158 52 C158 52 175 46 175 62 C175 74 166 82 158 86 C150 82 141 74 141 62 C141 46 158 52 158 52Z"
          fill={COLORS.primary}
        />
        {/* Checkmark on shield */}
        <Path
          d="M150 65 L156 71 L166 59"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Plant left */}
        <Rect x="28" y="120" width="6" height="20" rx="3" fill="#6B7280" />
        <Ellipse cx="31" cy="112" rx="10" ry="12" fill="#34D399" />
        {/* Plant right */}
        <Rect x="186" y="120" width="6" height="20" rx="3" fill="#6B7280" />
        <Ellipse cx="189" cy="112" rx="10" ry="12" fill="#34D399" />
      </Svg>

      <Text style={styles.title}>Let's Get Started</Text>
      <Text style={styles.subtitle}>
        Click + icon to add an extra layer of security for your accounts.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 8,
    lineHeight: 22,
  },
});
