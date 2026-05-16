import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GuideStep } from '../types';
import StepIllustration from './StepIllustration';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  step: GuideStep;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function AccordionStep({ step, isExpanded, onToggle }: Props) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleToggle} activeOpacity={0.7}>
        <View style={[styles.stepBadge, isExpanded && styles.stepBadgeActive]}>
          <Text style={[styles.stepNum, isExpanded && styles.stepNumActive]}>{step.id}</Text>
        </View>
        <Text style={[styles.title, isExpanded && styles.titleActive]}
          numberOfLines={isExpanded ? undefined : 2}>
          {step.title}
        </Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={isExpanded ? COLORS.primary : COLORS.textLight}
        />
      </TouchableOpacity>

      <Text style={styles.summary}>{step.summary}</Text>

      {isExpanded && (
        <>
          <Text style={styles.detail}>{step.detail}</Text>
          {step.image && <StepIllustration type={step.image} />}
        </>
      )}
    </View>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    stepBadge: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: C.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    stepBadgeActive: {
      backgroundColor: C.primary,
    },
    stepNum: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.sm,
      color: C.primary,
    },
    stepNumActive: {
      color: C.white,
    },
    title: {
      flex: 1,
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.base,
      color: C.textPrimary,
      lineHeight: 24,
    },
    titleActive: {
      color: C.primary,
    },
    summary: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
      color: C.textSecondary,
      lineHeight: 22,
      marginLeft: 40,
    },
    detail: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.md,
      color: C.textSecondary,
      lineHeight: 26,
      marginTop: 10,
      marginLeft: 40,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: C.border,
    },
  });
}
