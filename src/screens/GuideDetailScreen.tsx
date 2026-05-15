import React, { useState, useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import AccordionStep from '../components/AccordionStep';
import { COLORS } from '../constants/theme';
import { GuideStep, RootStackParamList } from '../types';

type Route = RouteProp<RootStackParamList, 'GuideDetail'>;

export default function GuideDetailScreen() {
  const { params } = useRoute<Route>();
  const { service } = params;
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

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
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: COLORS.border }} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
