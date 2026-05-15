import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, FlatList, Animated, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line, G, Ellipse } from 'react-native-svg';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const { width: W } = Dimensions.get('window');

// ── Illustrations ─────────────────────────────────────────────────────────

function SecurityIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      <Circle cx={130} cy={130} r={115} fill="#DBEAFE" />
      <Circle cx={130} cy={130} r={85} fill="#BFDBFE" opacity={0.5} />
      {/* Shield */}
      <Path d="M130 48 L196 76 L196 148 C196 182 163 202 130 216 C97 202 64 182 64 148 L64 76 Z" fill="#2563EB" />
      <Path d="M130 62 L184 86 L184 150 C184 176 158 193 130 204" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={4} strokeLinecap="round" />
      {/* Lock body */}
      <Rect x={110} y={132} width={40} height={34} rx={8} fill="white" />
      {/* Lock shackle */}
      <Path d="M118 132 L118 120 C118 108 142 108 142 120 L142 132" fill="none" stroke="white" strokeWidth={6} strokeLinecap="round" />
      {/* Keyhole */}
      <Circle cx={130} cy={145} r={6} fill="#2563EB" />
      <Rect x={127} y={145} width={6} height={9} rx={3} fill="#2563EB" />
      {/* Sparkles */}
      <Circle cx={42} cy={82} r={7} fill="#93C5FD" />
      <Circle cx={218} cy={78} r={5} fill="#93C5FD" />
      <Circle cx={38} cy={168} r={5} fill="#BFDBFE" />
      <Circle cx={222} cy={172} r={8} fill="#93C5FD" opacity={0.7} />
      <Circle cx={82} cy={36} r={5} fill="#DBEAFE" />
      <Circle cx={176} cy={32} r={6} fill="#BFDBFE" />
      {/* Stars */}
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
      {/* Phone */}
      <Rect x={82} y={45} width={96} height={168} rx={16} fill="white" />
      <Rect x={88} y={51} width={84} height={156} rx={12} fill="#F0FDF4" />
      {/* Notch */}
      <Rect x={107} y={49} width={46} height={9} rx={4} fill="white" />
      {/* Screen label */}
      <Rect x={96} y={72} width={68} height={8} rx={4} fill="#D1FAE5" />
      {/* Code display */}
      <Rect x={93} y={92} width={74} height={40} rx={10} fill="white" />
      {/* 6 digit blocks */}
      <Rect x={99} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={117} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={135} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={101} y={109} width={10} height={4} rx={2} fill="#10B981" />
      <Rect x={119} y={109} width={10} height={4} rx={2} fill="#10B981" />
      <Rect x={137} y={109} width={10} height={4} rx={2} fill="#10B981" />
      {/* Divider */}
      <Rect x={155} y={105} width={2} height={14} rx={1} fill="#D1FAE5" />
      <Rect x={160} y={102} width={14} height={20} rx={4} fill="#10B981" opacity={0.25} />
      <Rect x={162} y={109} width={10} height={4} rx={2} fill="#10B981" />
      {/* Copy hint */}
      <Rect x={96} y={140} width={68} height={6} rx={3} fill="#D1FAE5" />
      {/* App grid */}
      <Circle cx={105} cy={165} r={13} fill="white" />
      <Circle cx={130} cy={165} r={13} fill="white" />
      <Circle cx={155} cy={165} r={13} fill="white" />
      <Circle cx={105} cy={165} r={7} fill="#34D399" opacity={0.5} />
      <Circle cx={130} cy={165} r={7} fill="#10B981" opacity={0.5} />
      <Circle cx={155} cy={165} r={7} fill="#6EE7B7" opacity={0.5} />
      {/* Home bar */}
      <Rect x={108} y={196} width={44} height={5} rx={2} fill="#D1FAE5" />
      {/* Timer ring */}
      <Circle cx={130} cy={130} r={106} fill="none" stroke="#6EE7B7" strokeWidth={5} strokeDasharray="510 160" strokeLinecap="round" />
      <Circle cx={130} cy={24} r={9} fill="#10B981" />
      {/* Floaters */}
      <Circle cx={40} cy={95} r={9} fill="#A7F3D0" />
      <Circle cx={218} cy={82} r={7} fill="#6EE7B7" />
      <Circle cx={36} cy={168} r={6} fill="#D1FAE5" />
      <Circle cx={220} cy={175} r={10} fill="#A7F3D0" opacity={0.8} />
    </Svg>
  );
}

function ServicesIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      <Circle cx={130} cy={130} r={115} fill="#FEF3C7" />
      <Circle cx={130} cy={130} r={85} fill="#FDE68A" opacity={0.35} />
      {/* Center shield */}
      <Path d="M130 95 L158 108 L158 135 C158 153 144 162 130 167 C116 162 102 153 102 135 L102 108 Z" fill="#F59E0B" />
      <Path d="M122 133 L128 139 L140 124" stroke="white" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Service orbs */}
      {/* Google */}
      <Circle cx={60} cy={88} r={22} fill="white" />
      <Circle cx={60} cy={88} r={22} fill="none" stroke="#E5E7EB" strokeWidth={1.5} />
      <Path d="M60 80 C56 80 52 84 52 88 C52 92 56 96 60 96 C64 96 67 93 67 90 L62 90 L62 88 L69 88 C69 88 69 92 67 94" fill="none" stroke="#4285F4" strokeWidth={2} strokeLinecap="round" />
      {/* GitHub */}
      <Circle cx={200} cy={88} r={22} fill="white" />
      <Circle cx={200} cy={88} r={22} fill="none" stroke="#E5E7EB" strokeWidth={1.5} />
      <Circle cx={200} cy={85} r={8} fill="#181717" />
      <Ellipse cx={196} cy={94} rx={5} ry={3} fill="#181717" />
      <Ellipse cx={204} cy={94} rx={5} ry={3} fill="#181717" />
      {/* Microsoft */}
      <Circle cx={130} cy={55} r={22} fill="white" />
      <Circle cx={130} cy={55} r={22} fill="none" stroke="#E5E7EB" strokeWidth={1.5} />
      <Rect x={122} y={47} width={7} height={7} rx={1} fill="#F25022" />
      <Rect x={131} y={47} width={7} height={7} rx={1} fill="#7FBA00" />
      <Rect x={122} y={56} width={7} height={7} rx={1} fill="#00A4EF" />
      <Rect x={131} y={56} width={7} height={7} rx={1} fill="#FFB900" />
      {/* Discord */}
      <Circle cx={52} cy={175} r={22} fill="white" />
      <Circle cx={52} cy={175} r={22} fill="none" stroke="#E5E7EB" strokeWidth={1.5} />
      <Circle cx={52} cy={175} r={9} fill="#5865F2" />
      {/* Instagram */}
      <Circle cx={208} cy={175} r={22} fill="white" />
      <Circle cx={208} cy={175} r={22} fill="none" stroke="#E5E7EB" strokeWidth={1.5} />
      <Rect x={199} y={166} width={18} height={18} rx={5} fill="#E1306C" opacity={0.9} />
      <Circle cx={208} cy={175} r={5} fill="none" stroke="white" strokeWidth={1.5} />
      <Circle cx={215} cy={168} r={1.5} fill="white" />
      {/* Connection lines */}
      <Line x1={80} y1={96} x2={110} y2={112} stroke="#FCD34D" strokeWidth={1.5} strokeDasharray="4 3" />
      <Line x1={180} y1={96} x2={150} y2={112} stroke="#FCD34D" strokeWidth={1.5} strokeDasharray="4 3" />
      <Line x1={130} y1={77} x2={130} y2={100} stroke="#FCD34D" strokeWidth={1.5} strokeDasharray="4 3" />
      <Line x1={70} y1={158} x2={106} y2={142} stroke="#FCD34D" strokeWidth={1.5} strokeDasharray="4 3" />
      <Line x1={190} y1={158} x2={154} y2={142} stroke="#FCD34D" strokeWidth={1.5} strokeDasharray="4 3" />
      {/* "1000+" badge */}
      <Circle cx={130} cy={215} r={28} fill="white" />
      <Circle cx={130} cy={215} r={28} fill="none" stroke="#FDE68A" strokeWidth={2} />
    </Svg>
  );
}

// ── Slide Data ────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: '1',
    title: 'Keep Your Accounts\nSafe & Secure',
    subtitle: 'Two-factor authentication adds an extra layer of protection to all your online accounts.',
    illustration: <SecurityIllustration />,
    accent: '#2563EB',
    bg: '#EFF6FF',
    dotColor: '#2563EB',
  },
  {
    id: '2',
    title: 'One-Time Codes\nGenerated Instantly',
    subtitle: 'Get time-based 6-digit codes that refresh every 30 seconds, keeping hackers out.',
    illustration: <CodesIllustration />,
    accent: '#10B981',
    bg: '#F0FDF4',
    dotColor: '#10B981',
  },
  {
    id: '3',
    title: 'Works With 1000+\nPopular Services',
    subtitle: 'Compatible with Google, GitHub, Discord, Instagram and thousands of other platforms.',
    illustration: <ServicesIllustration />,
    accent: '#F59E0B',
    bg: '#FFFBEB',
    dotColor: '#F59E0B',
  },
];

// ── Component ─────────────────────────────────────────────────────────────

interface Props {
  onDone: () => void;
}

export default function OnboardingScreen({ onDone }: Props) {
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

      {/* Skip */}
      {currentIndex < SLIDES.length - 1 && (
        <SafeAreaView style={styles.skipWrap} edges={['top']}>
          <TouchableOpacity onPress={onDone} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}

      {/* Slides */}
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

      {/* Bottom controls */}
      <SafeAreaView style={styles.bottom} edges={['bottom']}>
        {/* Dots */}
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

        {/* CTA button */}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: slide.accent }]}
          onPress={goNext}
          activeOpacity={0.88}>
          <Text style={styles.btnText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: COLORS.textSecondary,
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
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
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
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});
