import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColors, AppColors, FONTS, SIZES, SHADOWS } from '../constants/theme';

export default function PremiumBanner() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <TouchableOpacity
      style={styles.banner}
      onPress={() => Alert.alert('Premium', 'Premium features coming soon!')}
      activeOpacity={0.85}>
      {/* Top accent stripe */}
      <View style={styles.accentBar} />

      <View style={styles.content}>
        {/* Gold icon */}
        <View style={styles.iconWrap}>
          <Icon name="star" size={26} color="#F59E0B" />
        </View>

        <View style={styles.textWrap}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Get Premium Now!</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Unlock all the Exciting Features</Text>
        </View>

        <Icon name="chevron-forward" size={20} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    banner: {
      backgroundColor: C.background,
      borderRadius: 16,
      margin: 16,
      borderWidth: 1,
      borderColor: C.border,
      overflow: 'hidden',
      ...SHADOWS.small,
    },
    accentBar: {
      height: 4,
      backgroundColor: C.primary,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: '#FEF3C7',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    textWrap: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.base,
      color: C.textPrimary,
    },
    proBadge: {
      backgroundColor: C.primary,
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 2,
    },
    proBadgeText: {
      fontFamily: FONTS.bold,
      fontSize: 10,
      color: '#fff',
      letterSpacing: 0.5,
    },
    subtitle: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
      color: C.textSecondary,
      marginTop: 3,
    },
  });
}
