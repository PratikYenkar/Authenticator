import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Switch,
  PanResponder, LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

const MIN_LEN = 4;
const MAX_LEN = 32;

function generatePassword(length: number, upper: boolean, lower: boolean, numbers: boolean, special: boolean): string {
  const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const nums   = '0123456789';
  const specials = '!@#$%^&*()';
  let charset = '';
  if (upper)   charset += uppers;
  if (lower)   charset += lowers;
  if (numbers) charset += nums;
  if (special) charset += specials;
  if (!charset) charset = lowers;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

function getStrength(pw: string): { label: string; color: string } {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 14) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak', color: '#EF4444' };
  if (score <= 3) return { label: 'Good', color: '#F59E0B' };
  return { label: 'Strong', color: '#10B981' };
}

function PasswordSlider({ value, onChange, COLORS }: { value: number; onChange: (v: number) => void; COLORS: AppColors }) {
  const trackWidthRef = useRef(0);
  const ratio = (value - MIN_LEN) / (MAX_LEN - MIN_LEN);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        if (trackWidthRef.current > 0) {
          const r = Math.max(0, Math.min(1, e.nativeEvent.locationX / trackWidthRef.current));
          onChange(Math.round(MIN_LEN + r * (MAX_LEN - MIN_LEN)));
        }
      },
      onPanResponderMove: (e) => {
        if (trackWidthRef.current > 0) {
          const r = Math.max(0, Math.min(1, e.nativeEvent.locationX / trackWidthRef.current));
          onChange(Math.round(MIN_LEN + r * (MAX_LEN - MIN_LEN)));
        }
      },
    }),
  ).current;

  return (
    <View
      style={[sliderStyles.track, { backgroundColor: COLORS.border }]}
      onLayout={(e: LayoutChangeEvent) => { trackWidthRef.current = e.nativeEvent.layout.width; }}
      {...panResponder.panHandlers}>
      <View style={[sliderStyles.fill, { width: `${ratio * 100}%`, backgroundColor: COLORS.primary }]} />
      <View style={[sliderStyles.thumb, { left: `${ratio * 100}%`, backgroundColor: COLORS.primary }]} />
    </View>
  );
}

const sliderStyles = StyleSheet.create({
  track: {
    height: 6, borderRadius: 3,
    position: 'relative', justifyContent: 'center',
  },
  fill: {
    position: 'absolute', left: 0, top: 0,
    height: 6, borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 22, height: 22, borderRadius: 11,
    top: -8, marginLeft: -11,
    elevation: 4,
  },
});

export default function GeneratePasswordScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const [length, setLength] = useState(12);
  const [upper, setUpper]   = useState(true);
  const [lower, setLower]   = useState(true);
  const [nums, setNums]     = useState(true);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState(() => generatePassword(12, true, true, true, false));

  const refresh = useCallback(() => {
    setPassword(generatePassword(length, upper, lower, nums, special));
  }, [length, upper, lower, nums, special]);

  const copy = useCallback(() => {
    Clipboard.setString(password);
    Toast.show({ type: 'success', text1: 'Password Copied!', visibilityTime: 2000 });
    setTimeout(() => Clipboard.setString(''), 60000);
  }, [password]);

  const strength = getStrength(password);

  React.useEffect(() => {
    setPassword(generatePassword(length, upper, lower, nums, special));
  }, [length, upper, lower, nums, special]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.headerExtra}>
        <TouchableOpacity onPress={copy} style={styles.headerBtn}>
          <Icon name="copy-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={refresh} style={styles.headerBtn}>
          <Icon name="refresh-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordBox}>
        <Text style={styles.passwordText}>{password}</Text>
        <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Password length: {length}</Text>
        <View style={styles.sliderRow}>
          <PasswordSlider value={length} onChange={setLength} COLORS={COLORS} />
        </View>
      </View>
      <View style={styles.separator} />

      {[
        { label: 'Upper case (A-Z)',               value: upper,   set: setUpper },
        { label: 'Lower case (a-z)',               value: lower,   set: setLower },
        { label: 'Numbers (0-9)',                  value: nums,    set: setNums },
        { label: 'Special characters (!@#$%^*())', value: special, set: setSpecial },
      ].map((row, i, arr) => (
        <View key={row.label}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{row.label}</Text>
            <Switch
              value={row.value}
              onValueChange={row.set}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          {i < arr.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    headerExtra: {
      flexDirection: 'row', justifyContent: 'flex-end',
      paddingHorizontal: 16, paddingVertical: 8, gap: 8,
    },
    headerBtn: {
      width: 40, height: 40, borderRadius: 10,
      backgroundColor: C.primaryLight,
      alignItems: 'center', justifyContent: 'center',
    },
    passwordBox: { paddingHorizontal: 20, paddingVertical: 20 },
    passwordText: {
      fontFamily: FONTS.bold, fontSize: 30,
      color: C.textPrimary, letterSpacing: 1,
    },
    strengthLabel: {
      fontFamily: FONTS.semiBold, fontSize: SIZES.base, marginTop: 6,
    },
    separator: { height: 1, backgroundColor: C.border },
    section: { paddingHorizontal: 20, paddingVertical: 18 },
    sectionLabel: {
      fontFamily: FONTS.semiBold, fontSize: SIZES.base,
      color: C.textPrimary, marginBottom: 14,
    },
    sliderRow: { paddingVertical: 10 },
    toggleRow: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 20, paddingVertical: 18,
      justifyContent: 'space-between',
    },
    toggleLabel: {
      fontFamily: FONTS.regular, fontSize: SIZES.base, color: C.textPrimary,
    },
  });
}
