import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import AccordionStep from '../components/AccordionStep';
import ServiceLogo from '../components/ServiceLogo';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { GuideStep, RootStackParamList } from '../types';

type Route = RouteProp<RootStackParamList, 'GuideDetail'>;

function ServiceHeader({ name, iconBg, stepCount }: {
  name: string;
  iconBg: string;
  stepCount: number;
}) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <View style={[styles.banner, { backgroundColor: iconBg + '18' }]}>
      <View style={[styles.bannerAccent, { backgroundColor: iconBg }]} />
      <View style={styles.bannerContent}>
        <ServiceLogo issuer={name} size={56} rounded={false} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>How to enable 2FA</Text>
          <Text style={[styles.bannerService, { color: iconBg }]}>{name}</Text>
          <View style={styles.stepsBadge}>
            <Text style={styles.stepsBadgeText}>{stepCount} steps</Text>
          </View>
        </View>
      </View>
      <View style={styles.bannerNote}>
        <Text style={styles.bannerNoteText}>
          Tap each step to expand and see detailed instructions
        </Text>
      </View>
    </View>
  );
}

export default function GuideDetailScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const { params } = useRoute<Route>();
  const { service } = params;
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]));

  const toggleStep = useCallback((id: number) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const renderItem = ({ item }: { item: GuideStep }) => (
    <AccordionStep
      step={item}
      isExpanded={expandedSteps.has(item.id)}
      onToggle={() => toggleStep(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={service.steps}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={
          <ServiceHeader
            name={service.name}
            iconBg={service.iconBg}
            stepCount={service.steps.length}
          />
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: COLORS.border }} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: C.background,
    },
    list: {
      paddingBottom: 32,
    },
    banner: {
      margin: 16,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 8,
    },
    bannerAccent: {
      height: 4,
      width: '100%',
    },
    bannerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 16,
    },
    bannerText: {
      flex: 1,
    },
    bannerTitle: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
      color: C.textSecondary,
      marginBottom: 2,
    },
    bannerService: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.xl,
      marginBottom: 8,
    },
    stepsBadge: {
      alignSelf: 'flex-start',
      backgroundColor: C.background,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: C.border,
    },
    stepsBadgeText: {
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.xs,
      color: C.textSecondary,
    },
    bannerNote: {
      paddingHorizontal: 16,
      paddingBottom: 14,
    },
    bannerNoteText: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.xs,
      color: C.textSecondary,
      fontStyle: 'italic',
    },
  });
}
