import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants/theme';

export default function PremiumBanner() {
  return (
    <TouchableOpacity
      style={styles.banner}
      onPress={() => Alert.alert('Premium', 'Premium features coming soon!')}
      activeOpacity={0.85}>
      <View style={styles.iconWrap}>
        <Icon name="gift-outline" size={32} color={COLORS.white} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Get Premium Now!</Text>
        <Text style={styles.subtitle}>Unlock all the Exciting Features Now</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    margin: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    marginRight: 14,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
  },
});
