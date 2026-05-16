import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSettingsStore } from '../store/settingsStore';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English (US)',        flag: '🇺🇸' },
  { code: 'fr', label: 'française (French)',  flag: '🇫🇷' },
  { code: 'es', label: 'Español (Spanish)',   flag: '🇪🇸' },
  { code: 'pt', label: 'Português (Portuguese)', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский (Russian)',   flag: '🇷🇺' },
  { code: 'ja', label: '日本 (Japanese)',      flag: '🇯🇵' },
  { code: 'zh', label: '中国人 (Chinese)',     flag: '🇨🇳' },
  { code: 'de', label: 'Deutsch (German)',    flag: '🇩🇪' },
  { code: 'it', label: 'Italiana (Italian)',  flag: '🇮🇹' },
  { code: 'ko', label: '한국인 (Korean)',      flag: '🇰🇷' },
  { code: 'si', label: 'සිංහල (Sinhala)',     flag: '🇱🇰' },
  { code: 'hi', label: 'हिंदी (Hindi)',        flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা (Bengali)',      flag: '🇧🇩' },
  { code: 'ca', label: 'català (Catalan)',    flag: '🏴' },
];

export default function LanguageScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation();
  const { language, setLanguage } = useSettingsStore();

  const handleSelect = (code: string) => {
    setLanguage(code);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const selected = item.code === language;
          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleSelect(item.code)}
              activeOpacity={0.7}>
              {/* Radio */}
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <View style={styles.radioDot} />}
              </View>

              {/* Label */}
              <Text style={[styles.label, selected && styles.labelSelected]}>
                {item.label}
              </Text>

              {/* Flag */}
              <View style={styles.flagWrap}>
                <Text style={styles.flag}>{item.flag}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.background },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 18,
    },
    separator: { height: 1, backgroundColor: C.border, marginHorizontal: 20 },
    radio: {
      width: 22, height: 22, borderRadius: 11,
      borderWidth: 2, borderColor: C.border,
      alignItems: 'center', justifyContent: 'center',
      marginRight: 16,
    },
    radioSelected: { borderColor: C.primary },
    radioDot: {
      width: 11, height: 11, borderRadius: 6,
      backgroundColor: C.primary,
    },
    label: {
      flex: 1,
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.base,
      color: C.textPrimary,
    },
    labelSelected: { color: C.primary },
    flagWrap: {
      width: 44, height: 44, borderRadius: 12,
      backgroundColor: C.backgroundGray,
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    },
    flag: { fontSize: 28 },
  });
}
