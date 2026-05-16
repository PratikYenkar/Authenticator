import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';
import AdBanner from '../components/AdBanner';

type Nav = StackNavigationProp<RootStackParamList>;

function PasswordIllustration() {
  return (
    <Svg width="260" height="200" viewBox="0 0 260 200">
      <Rect x="80" y="10" width="100" height="160" rx="16" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="2" />
      <Rect x="85" y="20" width="90" height="140" rx="10" fill="#fff" />
      <Path d="M120 65 C120 57 140 57 140 65 L140 72 L120 72 Z" fill="#6366F1" />
      <Rect x="115" y="72" width="30" height="22" rx="4" fill="#6366F1" />
      <Circle cx="130" cy="83" r="4" fill="#EEF2FF" />
      <Rect x="95" y="100" width="70" height="8" rx="4" fill="#E0E7FF" />
      {[0,1,2,3,4,5].map(i => (
        <Circle key={i} cx={103 + i * 10} cy="120" r="4" fill="#6366F1" />
      ))}
      <Rect x="100" y="132" width="60" height="16" rx="8" fill="#6366F1" />
      <Rect x="115" y="137" width="30" height="6" rx="3" fill="#EEF2FF" />
      <Path d="M195 30 C195 30 185 27 185 20 L185 10 L205 6 L225 10 L225 20 C225 27 215 30 205 30 Z" fill="#4F46E5" />
      <Path d="M198 20 L203 25 L214 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Circle cx="55" cy="50" r="12" fill="none" stroke="#C7D2FE" strokeWidth="2" />
      <Circle cx="55" cy="50" r="5" fill="#C7D2FE" />
      <Circle cx="35" cy="120" r="8" fill="none" stroke="#C7D2FE" strokeWidth="2" />
      <Circle cx="35" cy="120" r="3" fill="#C7D2FE" />
      <Path d="M220 140 Q230 120 240 130 Q235 150 220 140 Z" fill="#6EE7B7" />
      <Path d="M225 145 Q240 135 242 148 Q235 158 225 145 Z" fill="#34D399" />
      <Rect x="230" y="148" width="4" height="22" rx="2" fill="#6EE7B7" />
    </Svg>
  );
}

export default function PasswordManagerScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <AdBanner />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.illustrationWrap}>
          <PasswordIllustration />
        </View>

        <Text style={styles.desc}>
          A quick and secure offline password manager that lets you keep all of your encrypted passwords in one location on your smartphone.
        </Text>

        <View style={styles.optionList}>
          <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('GeneratePassword')} activeOpacity={0.75}>
            <View style={styles.optionIcon}>
              <Icon name="key-outline" size={26} color={COLORS.primary} />
            </View>
            <Text style={styles.optionLabel}>Generate Password</Text>
            <Icon name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('ManagePassword')} activeOpacity={0.75}>
            <View style={styles.optionIcon}>
              <Icon name="shield-checkmark-outline" size={26} color={COLORS.primary} />
            </View>
            <Text style={styles.optionLabel}>Manage Password</Text>
            <Icon name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    scroll: { paddingBottom: 40 },
    illustrationWrap: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
    desc: {
      fontFamily: FONTS.regular, fontSize: SIZES.base,
      color: C.textSecondary, lineHeight: 26,
      paddingHorizontal: 20, marginBottom: 28, textAlign: 'left',
    },
    optionList: {
      marginHorizontal: 16, borderRadius: 16, overflow: 'hidden',
      borderWidth: 1, borderColor: C.border, backgroundColor: C.background,
    },
    optionRow: {
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 18, paddingVertical: 20,
    },
    optionIcon: {
      width: 44, height: 44, borderRadius: 12,
      backgroundColor: C.primaryLight,
      alignItems: 'center', justifyContent: 'center', marginRight: 16,
    },
    optionLabel: {
      flex: 1, fontFamily: FONTS.semiBold,
      fontSize: SIZES.base, color: C.textPrimary,
    },
    divider: { height: 1, backgroundColor: C.border, marginHorizontal: 18 },
  });
}
