import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundGray,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  text: {
    fontSize: SIZES.base,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
