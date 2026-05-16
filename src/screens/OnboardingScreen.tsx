import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, FlatList, Animated, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import ServiceLogo from '../components/ServiceLogo';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { useTranslation } from '../hooks/useTranslation';

const { width: W } = Dimensions.get('window');

function SecurityIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      <Circle cx={130} cy={130} r={115} fill="#DBEAFE" />
      <Circle cx={130} cy={130} r={85} fill="#BFDBFE" opacity={0.5} />
      <Path d="M130 48 L196 76 L196 148 C196 182 163 202 130 216 C97 202 64 182 64 148 L64 76 Z" fill="#2563EB" />
      <Path d="M130 62 L184 86 L184 150 C184 176 158 193 130 204" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={4} strokeLinecap="round" />
      <Rect x={110} y={132} width={40} height={34} rx={8} fill="white" />
      <Path d="M118 132 L118 120 C118 108 142 108 142 120 L142 132" fill="none" stroke="white" strokeWidth={6} strokeLinecap="round" />
      <Circle cx={130} cy={145} r={6} fill="#2563EB" />
      <Rect x={127} y={145} width={6} height={9} rx={3} fill="#2563EB" />
      <Circle cx={42} cy={82} r={7} fill="#93C5FD" />
      <Circle cx={218} cy={78} r={5} fill="#93C5FD" />
      <Circle cx={38} cy={168} r={5} fill="#BFDBFE" />
      <Circle cx={222} cy={172} r={8} fill="#93C5FD" opacity={0.7} />
      <Circle cx={82} cy={36} r={5} fill="#DBEAFE" />
      <Circle cx={176} cy={32} r={6} fill="#BFDBFE" />
      <Path d="M44 118 L47 111 L50 118 L57 115 L52 121 L57 127 L50 124 L47 131 L44 124 L37 127 L42 121 L37 115 Z" fill="#93C5FD" opacity={0.8} />
      <Path d="M210 130 L212 125 L214 130 L219 128 L215 132 L219 136 L214 134 L212 139 L210 134 L205 136 L209 132 L205 128 Z" fill="#BFDBFE" opacity={0.9} />
    </Svg>
  );
}

function CodesIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      <Circle cx={130} cy={130} r={115} fill="#D1FAE5" />
      <Circle cx={130} cy={130} r={85} fill="#A7F3D0" opacity={0.4} />
      <Rect x={82} y={45} width={96} height={168} rx={16} fill="white" />
      <Rect x={88} y={51} width={84} height={156} rx={12} fill="#F0FDF4" />
      <Rect x={107} y={49} width={46} height={9} rx={4} fill="white" />
      <Rect x={96} y={72} width={68} height={8} rx={4} fill="#D1FAE5" />
      <Rect x={93} y={92} width={74} height={40} rx={10} fill="white" />
      <Rect x={99} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={117} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={135} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={101} y={109} width={10} height={4} rx={2} fill="#10B981" />
      <Rect x={119} y={109} width={10} height={4} rx={2} fill="#10B981" />
      <Rect x={137} y={109} width={10} height={4} rx={2} fill="#10B981" />
      <Rect x={155} y={105} width={2} height={14} rx={1} fill="#D1FAE5" />
      <Rect x={160} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={162} y={109} width={10} height={4} rx={2} fill="#10B981" />
      <Rect x={96} y={140} width={68} height={6} rx={3} fill="#D1FAE5" />
      <Circle cx={105} cy={165} r={13} fill="white" />
      <Circle cx={130} cy={165} r={13} fill="white" />
      <Circle cx={155} cy={165} r={13} fill="white" />
      <Circle cx={105} cy={165} r={7} fill="#34D399" opacity={0.5} />
      <Circle cx={130} cy={165} r={7} fill="#10B981" opacity={0.5} />
      <Circle cx={155} cy={165} r={7} fill="#6EE7B7" opacity={0.5} />
      <Rect x={108} y={196} width={44} height={5} rx={2} fill="#D1FAE5" />
      <Circle cx={130} cy={130} r={106} fill="none" stroke="#6EE7B7" strokeWidth={5} strokeDasharray="510 160" strokeLinecap="round" />
      <Circle cx={130} cy={24} r={9} fill="#10B981" />
      <Circle cx={40} cy={95} r={9} fill="#A7F3D0" />
      <Circle cx={218} cy={82} r={7} fill="#6EE7B7" />
      <Circle cx={36} cy={168} r={6} fill="#D1FAE5" />
      <Circle cx={220} cy={175} r={10} fill="#A7F3D0" opacity={0.8} />
    </Svg>
  );
}

const SERVICE_ROWS = [
  ['google', 'github', 'discord'],
  ['instagram', 'microsoft', 'apple'],
  ['spotify', 'amazon', 'x'],
];

function ServicesIllustration() {
  return (
    <View style={serviceStyles.wrap}>
      {SERVICE_ROWS.map((row, ri) => (
        <View key={ri} style={serviceStyles.row}>
          {row.map(name => (
            <ServiceLogo key={name} issuer={name} size={64} rounded={false} />
          ))}
        </View>
      ))}
    </View>
  );
}

const serviceStyles = StyleSheet.create({
  wrap: {
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
});

interface Props {
  onDone: () => void;
}

export default function OnboardingScreen({ onDone }: Props) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const t = useTranslation();

  const SLIDES = [
    {
      id: '1',
      title: t.slide1Title,
      subtitle: t.slide1Sub,
      illustration: <SecurityIllustration />,
      accent: '#2563EB',
      bg: '#EFF6FF',
      dotColor: '#2563EB',
    },
    {
      id: '2',
      title: t.slide2Title,
      subtitle: t.slide2Sub,
      illustration: <CodesIllustration />,
      accent: '#10B981',
      bg: '#F0FDF4',
      dotColor: '#10B981',
    },
    {
      id: '3',
      title: t.slide3Title,
      subtitle: t.slide3Sub,
      illustration: <ServicesIllustration />,
      accent: '#F59E0B',
      bg: '#FFFBEB',
      dotColor: '#F59E0B',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slide = SLIDES[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      onDone();
    }
  }, [currentIndex, onDone]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: scrollX.interpolate({
              inputRange: SLIDES.map((_, i) => i * W),
              outputRange: SLIDES.map(s => s.bg),
            }),
          },
        ]}
      />

      {currentIndex < SLIDES.length - 1 && (
        <SafeAreaView style={styles.skipWrap} edges={['top']}>
          <TouchableOpacity onPress={onDone} style={styles.skipBtn}>
            <Text style={styles.skipText}>{t.skip}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.illustration}>{item.illustration}</View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <SafeAreaView style={styles.bottom} edges={['bottom']}>
        <View style={styles.dots}>
          {SLIDES.map((s, i) => {
            const inputRange = [(i - 1) * W, i * W, (i + 1) * W];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.35, 1, 0.35],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={s.id}
                style={[styles.dot, { width: dotWidth, opacity, backgroundColor: slide.dotColor }]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: slide.accent }]}
          onPress={goNext}
          activeOpacity={0.88}>
          <Text style={styles.btnText}>
            {currentIndex === SLIDES.length - 1 ? t.getStarted : t.next}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    skipWrap: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 10,
    },
    skipBtn: {
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    skipText: {
      fontFamily: FONTS.medium,
      fontSize: SIZES.base,
      color: C.textSecondary,
    },
    slide: {
      width: W,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
      paddingBottom: 160,
    },
    illustration: {
      marginBottom: 40,
    },
    title: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.xxl,
      color: C.textPrimary,
      textAlign: 'center',
      lineHeight: 36,
      marginBottom: 16,
    },
    subtitle: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.md,
      color: C.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: 300,
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingBottom: 8,
    },
    dots: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      gap: 6,
    },
    dot: {
      height: 8,
      borderRadius: 4,
    },
    btn: {
      width: W - 64,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    btnText: {
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.base,
      color: C.white,
      letterSpacing: 0.3,
    },
  });
}
