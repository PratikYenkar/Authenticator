import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceLogo from './ServiceLogo';
import { GuideService } from '../types';
import { COLORS, FONTS, SIZES } from '../constants/theme';

interface Props {
  service: GuideService;
  onPress: () => void;
}

export default function ServiceRow({ service, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <ServiceLogo issuer={service.name} size={42} />
      <View style={styles.info}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.domain}>{service.domain}</Text>
      </View>
      <Icon name="chevron-forward" size={18} color={COLORS.textLight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
  },
  domain: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
