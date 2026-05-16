import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

interface Props {
  icon: string;
  label: string;
  onPress?: () => void;
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  type?: 'arrow' | 'switch' | 'none';
  sublabel?: string;
}

export default function SettingsRow({
  icon,
  label,
  onPress,
  value,
  onValueChange,
  type = 'arrow',
  sublabel,
}: Props) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={type === 'arrow' ? onPress : undefined}
      activeOpacity={type === 'arrow' ? 0.7 : 1}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={22} color={COLORS.primary} />
      </View>
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{label}</Text>
        {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      </View>
      {type === 'arrow' && (
        <Icon name="chevron-forward" size={20} color={COLORS.textLight} />
      )}
      {type === 'switch' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      )}
    </TouchableOpacity>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      minHeight: 62,
      paddingVertical: 10,
      backgroundColor: C.background,
      borderBottomWidth: 1,
      borderBottomColor: C.separator,
    },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: C.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    labelWrap: {
      flex: 1,
    },
    label: {
      fontFamily: FONTS.medium,
      fontSize: SIZES.base,
      color: C.textPrimary,
    },
    sublabel: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.xs,
      color: C.textSecondary,
      marginTop: 2,
    },
  });
}
