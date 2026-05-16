import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: C.backgroundGray,
      paddingTop: 22,
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    text: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.sm,
      color: C.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
  });
}
