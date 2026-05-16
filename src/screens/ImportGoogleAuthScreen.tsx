import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

const STEPS = [
  {
    id: 1,
    text: 'Open ',
    highlight: 'Google Authenticator',
    rest: ' on your Android or iOS device.',
  },
  {
    id: 2,
    text: 'Tap the menu button ',
    highlight: '☰',
    rest: ' in the top-right corner of Google Authenticator.',
  },
  {
    id: 3,
    text: 'Select ',
    highlight: '"Transfer accounts"',
    rest: ' → ',
    highlight2: '"Export accounts"',
  },
  {
    id: 4,
    text: 'Select the accounts you want to export and tap ',
    highlight: 'Next.',
    rest: '',
  },
  {
    id: 5,
    text: 'A QR Code will appear — open this app, tap ',
    highlight: '+',
    rest: ', choose Scan QR Code and scan the QR code shown.',
  },
];

export default function ImportGoogleAuthScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.banner}>
          <Icon name="information-circle-outline" size={22} color={COLORS.primary} />
          <Text style={styles.bannerText}>
            This works only with Google Authenticator. Other apps may export differently.
          </Text>
        </View>

        {STEPS.map((step, i) => (
          <View key={step.id}>
            <View style={styles.stepRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeNum}>{step.id}</Text>
              </View>
              <Text style={styles.stepText}>
                {step.text}
                <Text style={styles.highlight}>{step.highlight}</Text>
                {step.rest}
                {step.highlight2 ? <Text style={styles.highlight}>{step.highlight2}</Text> : null}
              </Text>
            </View>
            {i < STEPS.length - 1 && <View style={styles.divider} />}
          </View>
        ))}

        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.navigate('QRScanner')}
          activeOpacity={0.85}>
          <Icon name="qr-code-outline" size={22} color={COLORS.white} style={{ marginRight: 10 }} />
          <Text style={styles.scanBtnText}>Open QR Scanner</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    scroll: { padding: 16, paddingBottom: 40 },
    banner: {
      flexDirection: 'row', alignItems: 'flex-start',
      backgroundColor: C.primaryLight, borderRadius: 12,
      padding: 14, gap: 10, marginBottom: 20,
    },
    bannerText: {
      flex: 1, fontFamily: FONTS.regular,
      fontSize: SIZES.sm, color: C.primary, lineHeight: 22,
    },
    stepRow: {
      flexDirection: 'row', alignItems: 'flex-start',
      paddingVertical: 18, paddingHorizontal: 4, gap: 14,
    },
    badge: {
      width: 28, height: 28, borderRadius: 14,
      backgroundColor: C.primaryLight,
      alignItems: 'center', justifyContent: 'center',
      marginTop: 1,
    },
    badgeNum: { fontFamily: FONTS.bold, fontSize: SIZES.sm, color: C.primary },
    stepText: {
      flex: 1, fontFamily: FONTS.regular,
      fontSize: SIZES.base, color: C.textPrimary, lineHeight: 26,
    },
    highlight: { fontFamily: FONTS.bold, color: C.primary },
    divider: { height: 1, backgroundColor: C.border, marginLeft: 42 },
    scanBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      backgroundColor: C.primary, borderRadius: 28, height: 56,
      marginTop: 32,
    },
    scanBtnText: { fontFamily: FONTS.bold, fontSize: SIZES.base, color: C.white },
  });
}
