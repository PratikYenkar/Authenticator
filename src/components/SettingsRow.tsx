import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants/theme';

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
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={type === 'arrow' ? onPress : undefined}
      activeOpacity={type === 'arrow' ? 0.7 : 1}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{label}</Text>
        {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      </View>
      {type === 'arrow' && (
        <Icon name="chevron-forward" size={18} color={COLORS.textLight} />
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  labelWrap: {
    flex: 1,
  },
  label: {
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  sublabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
});
