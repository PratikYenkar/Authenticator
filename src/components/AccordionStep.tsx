import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GuideStep } from '../types';
import { COLORS, SIZES } from '../constants/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  step: GuideStep;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function AccordionStep({ step, isExpanded, onToggle }: Props) {
  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleToggle} activeOpacity={0.7}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepNum}>{step.id}</Text>
        </View>
        <Text style={styles.title} numberOfLines={isExpanded ? undefined : 2}>{step.title}</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={COLORS.textLight}
        />
      </TouchableOpacity>

      <Text style={styles.summary}>{step.summary}</Text>

      {isExpanded && (
        <Text style={styles.detail}>{step.detail}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepNum: {
    fontSize: SIZES.sm,
    fontWeight: '700',
    color: COLORS.primary,
  },
  title: {
    flex: 1,
    fontSize: SIZES.base,
    fontWeight: '600',
    color: COLORS.primary,
  },
  summary: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginLeft: 34,
  },
  detail: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 8,
    marginLeft: 34,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
