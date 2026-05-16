import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { useTranslation } from '../hooks/useTranslation';

function Illustration({ primary }: { primary: string }) {
  return (
    <Svg width={260} height={280} viewBox="0 0 260 280">

      {/* Background glow circles */}
      <Circle cx={130} cy={140} r={118} fill="#EFF6FF" />
      <Circle cx={130} cy={140} r={88}  fill="#DBEAFE" opacity={0.4} />

      {/* ── Phone body ── */}
      <Rect x={72} y={38} width={116} height={196} rx={22} fill="#1E293B" />
      {/* Screen */}
      <Rect x={80} y={56} width={100} height={164} rx={14} fill="#F8FAFC" />
      {/* Punch-hole camera */}
      <Circle cx={130} cy={49} r={5} fill="#0F172A" />
      {/* Home bar */}
      <Rect x={112} y={226} width={36} height={4} rx={2} fill="#334155" />

      {/* ── OTP code card ── */}
      <Rect x={88} y={68} width={84} height={54} rx={10} fill="white" />
      {/* Shield mini icon on card */}
      <Path
        d="M100 76 L106 78.5 L106 84 C106 88 103 90 100 91.5 C97 90 94 88 94 84 L94 78.5 Z"
        fill={primary}
      />
      {/* Checkmark in mini shield */}
      <Path
        d="M97 84 L99.5 86.5 L103 82"
        stroke="white" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      {/* 6 OTP digit slots */}
      <Rect x={112} y={74} width={10} height={16} rx={3} fill="#DBEAFE" />
      <Rect x={125} y={74} width={10} height={16} rx={3} fill="#DBEAFE" />
      <Rect x={138} y={74} width={10} height={16} rx={3} fill="#DBEAFE" />
      <Rect x={151} y={74} width={10} height={16} rx={3} fill="#DBEAFE" />
      {/* Timer bar */}
      <Rect x={112} y={96} width={49} height={3} rx={1.5} fill="#E2E8F0" />
      <Rect x={112} y={96} width={18} height={3} rx={1.5} fill={primary} opacity={0.6} />

      {/* ── Service placeholder row 1 ── */}
      <Rect x={88} y={132} width={84} height={26} rx={8} fill="white" />
      <Circle cx={101} cy={145} r={9} fill="#E2E8F0" />
      <Rect x={116} y={140} width={36} height={5} rx={2.5} fill="#E2E8F0" />
      <Rect x={116} y={149} width={24} height={4} rx={2} fill="#F1F5F9" />

      {/* ── Service placeholder row 2 ── */}
      <Rect x={88} y={164} width={84} height={26} rx={8} fill="white" />
      <Circle cx={101} cy={177} r={9} fill="#E2E8F0" />
      <Rect x={116} y={172} width={40} height={5} rx={2.5} fill="#E2E8F0" />
      <Rect x={116} y={181} width={28} height={4} rx={2} fill="#F1F5F9" />

      {/* ── Service placeholder row 3 (faded) ── */}
      <Rect x={88} y={196} width={84} height={18} rx={6} fill="white" opacity={0.5} />
      <Circle cx={101} cy={205} r={6} fill="#E2E8F0" opacity={0.5} />
      <Rect x={113} y={201} width={32} height={4} rx={2} fill="#E2E8F0" opacity={0.5} />

      {/* ── Floating FAB hint (bottom-right) ── */}
      <Circle cx={208} cy={205} r={26} fill={primary} opacity={0.12} />
      <Circle cx={208} cy={205} r={20} fill={primary} />
      {/* Plus icon */}
      <Rect x={205} y={197} width={6} height={16} rx={3} fill="white" />
      <Rect x={200} y={202} width={16} height={6} rx={3} fill="white" />

      {/* ── Shield badge (left floating) ── */}
      <Circle cx={50} cy={105} r={22} fill="white" />
      <Circle cx={50} cy={105} r={22} fill="none" stroke="#BFDBFE" strokeWidth={1.5} />
      <Path
        d="M50 93 L62 97.5 L62 108 C62 116 56 120 50 123 C44 120 38 116 38 108 L38 97.5 Z"
        fill={primary}
      />
      <Path
        d="M45 108 L49 112 L57 103"
        stroke="white" strokeWidth={2.5}
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />

      {/* ── Lock badge (top-right floating) ── */}
      <Circle cx={214} cy={78} r={20} fill="white" />
      <Circle cx={214} cy={78} r={20} fill="none" stroke="#BFDBFE" strokeWidth={1.5} />
      <Rect x={207} y={77} width={14} height={12} rx={3} fill="#93C5FD" />
      <Path
        d="M210 77 L210 73 C210 69 218 69 218 73 L218 77"
        fill="none" stroke="#93C5FD" strokeWidth={2.5} strokeLinecap="round"
      />
      <Circle cx={214} cy={83} r={2.5} fill="white" />

      {/* ── Decorative dots ── */}
      <Circle cx={40}  cy={155} r={5}   fill="#93C5FD" opacity={0.6} />
      <Circle cx={32}  cy={170} r={3.5} fill="#BFDBFE" opacity={0.8} />
      <Circle cx={240} cy={125} r={4}   fill="#93C5FD" opacity={0.6} />
      <Circle cx={248} cy={140} r={3}   fill="#BFDBFE" opacity={0.8} />
      <Circle cx={56}  cy={55}  r={4}   fill="#BFDBFE" opacity={0.7} />
      <Circle cx={200} cy={48}  r={3}   fill="#93C5FD" opacity={0.6} />

      {/* ── Sparkle top-left ── */}
      <Path
        d="M42 72 L44 66 L46 72 L52 70 L47 74 L52 78 L46 76 L44 82 L42 76 L36 78 L41 74 L36 70 Z"
        fill="#FCD34D" opacity={0.85}
      />
      {/* ── Sparkle bottom-right ── */}
      <Path
        d="M228 158 L229.5 153 L231 158 L236 156 L232 159.5 L236 163 L231 161 L229.5 166 L228 161 L223 163 L227 159.5 L223 156 Z"
        fill="#FCD34D" opacity={0.75}
      />
    </Svg>
  );
}

export default function EmptyState() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const t = useTranslation();
  return (
    <View style={styles.container}>
      <Illustration primary={COLORS.primary} />
      <Text style={styles.title}>{t.emptyTitle}</Text>
      <Text style={styles.subtitle}>{t.emptySubtitle}</Text>
    </View>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
      paddingTop: 20,
    },
    title: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.xxl,
      color: C.textPrimary,
      marginTop: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.md,
      color: C.textSecondary,
      textAlign: 'center',
      maxWidth: 280,
      marginTop: 8,
      lineHeight: 22,
    },
  });
}
