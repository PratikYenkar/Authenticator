import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  AppState, AppStateStatus, StatusBar, TextInput, Modal,
  BackHandler, Image, ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useAccountStore } from '../store/accountStore';
import { useSettingsStore } from '../store/settingsStore';
import { useBiometrics } from '../hooks/useBiometrics';
import { useScreenshot } from '../hooks/useScreenshot';
import TOTPCard from '../components/TOTPCard';
import EmptyState from '../components/EmptyState';
import FABMenu from '../components/FABMenu';
import AdBanner from '../components/AdBanner';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { useTranslation } from '../hooks/useTranslation';
import { Account, RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

function SecurityBanner() {
  const COLORS = useColors();
  return (
    <View style={{
      marginHorizontal: 16, marginTop: 4, marginBottom: 8,
      borderRadius: 18, overflow: 'hidden',
      backgroundColor: COLORS.primaryLight,
    }}>
      {/* <Image
        source={require('../assets/security-banner.png')}
        style={{ width: '100%', height: 160 }}
        resizeMode="cover"
      /> */}
    </View>
  );
}

export default function HomeScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const t = useTranslation();
  const navigation = useNavigation<Nav>();
  const accounts = useAccountStore(s => s.accounts);
  const { biometricEnabled, screenshotAllowed } = useSettingsStore();
  const { authenticate, checkAvailability } = useBiometrics();
  const { enableScreenshot, disableScreenshot } = useScreenshot();
  const appState = useRef(AppState.currentState);
  const [query, setQuery] = useState('');
  const [exitVisible, setExitVisible] = useState(false);

  useEffect(() => {
    if (screenshotAllowed) {
      enableScreenshot();
    } else {
      disableScreenshot();
    }
  }, [screenshotAllowed]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [biometricEnabled]);

  useEffect(() => {
    const back = BackHandler.addEventListener('hardwareBackPress', () => {
      setExitVisible(true);
      return true;
    });
    return () => back.remove();
  }, []);

  const handleAppStateChange = useCallback(
    async (nextState: AppStateStatus) => {
      if (appState.current === 'background' && nextState === 'active') {
        if (biometricEnabled) {
          const available = await checkAvailability();
          if (available) {
            const success = await authenticate('Unlock 2FA Authenticator');
            if (!success) {
              Toast.show({ type: 'error', text1: 'Authentication Failed' });
            }
          }
        }
      }
      appState.current = nextState;
    },
    [biometricEnabled, authenticate, checkAvailability],
  );

  const filtered = accounts.filter(a =>
    a.issuer.toLowerCase().includes(query.toLowerCase()) ||
    (a.username || '').toLowerCase().includes(query.toLowerCase()),
  );

  const renderItem = useCallback(
    ({ item }: { item: Account }) => <TOTPCard account={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Account) => item.id, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={COLORS.background === '#111827' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.appName}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('GuideList')} style={styles.headerBtn}>
            <Icon name="book-outline" size={26} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.headerBtn}>
            <Icon name="settings-outline" size={26} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner Ad */}
      <AdBanner />

      {/* Search */}
      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={20} color={COLORS.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={COLORS.textLight}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Icon name="close-circle" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={filtered.length === 0 ? styles.emptyContainer : styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={<SecurityBanner />}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
      />

      {/* Guide Link */}
      <View style={styles.guideFooter}>
        <Text style={styles.guideText}>{t.needHelp} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('GuideList')}>
          <Text style={styles.guideLink}>{t.guideLink}</Text>
        </TouchableOpacity>
      </View>

      {/* FAB */}
      <FABMenu />

      {/* Exit Dialog */}
      <Modal visible={exitVisible} transparent animationType="fade">
        <View style={styles.exitOverlay}>
          <View style={styles.exitCard}>
            <Icon name="exit-outline" size={72} color={COLORS.primary} style={styles.exitIcon} />
            <Text style={styles.exitTitle}>{t.exitTitle}</Text>
            <Text style={styles.exitMsg}>{t.exitMsg}</Text>
            <View style={styles.exitBtns}>
              <TouchableOpacity style={styles.exitBtnNo} onPress={() => setExitVisible(false)}>
                <Text style={styles.exitBtnNoText}>{t.no}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exitBtnYes} onPress={() => BackHandler.exitApp()}>
                <Text style={styles.exitBtnYesText}>{t.yes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.backgroundGray },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingVertical: 14,
      backgroundColor: C.background,
      borderBottomWidth: 1, borderBottomColor: C.border,
    },
    headerTitle: { fontFamily: FONTS.bold, fontSize: SIZES.xl, color: C.textPrimary },
    headerActions: { flexDirection: 'row', alignItems: 'center' },
    headerBtn: { marginLeft: 16 },
    searchWrap: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.backgroundGray,
      borderRadius: 14, marginHorizontal: 16, marginVertical: 12,
      paddingHorizontal: 14, height: 50,
      borderWidth: 1, borderColor: C.border,
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
      flex: 1, fontFamily: FONTS.regular,
      fontSize: SIZES.base, color: C.textPrimary,
    },
    list: { paddingBottom: 100 },
    emptyContainer: { flex: 1 },
    guideFooter: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      paddingVertical: 14, backgroundColor: C.background,
      borderTopWidth: 1, borderTopColor: C.border,
    },
    guideText: { fontFamily: FONTS.regular, fontSize: SIZES.sm, color: C.textSecondary },
    guideLink: { fontFamily: FONTS.semiBold, fontSize: SIZES.sm, color: C.primary },
    exitOverlay: {
      flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
      alignItems: 'center', justifyContent: 'center',
    },
    exitCard: {
      backgroundColor: C.background, borderRadius: 24,
      marginHorizontal: 32, padding: 32, alignItems: 'center',
      width: '85%',
    },
    exitIcon: { marginBottom: 12 },
    exitTitle: {
      fontFamily: FONTS.bold, fontSize: SIZES.xxl,
      color: C.primary, marginBottom: 10,
    },
    exitMsg: {
      fontFamily: FONTS.regular, fontSize: SIZES.base,
      color: C.textSecondary, textAlign: 'center', marginBottom: 28, lineHeight: 24,
    },
    exitBtns: { flexDirection: 'row', gap: 14, width: '100%' },
    exitBtnNo: {
      flex: 1, height: 52, borderRadius: 26,
      backgroundColor: C.backgroundGray, borderWidth: 1, borderColor: C.border,
      alignItems: 'center', justifyContent: 'center',
    },
    exitBtnNoText: { fontFamily: FONTS.semiBold, fontSize: SIZES.base, color: C.textSecondary },
    exitBtnYes: {
      flex: 1, height: 52, borderRadius: 26,
      backgroundColor: C.primary,
      alignItems: 'center', justifyContent: 'center',
    },
    exitBtnYesText: { fontFamily: FONTS.bold, fontSize: SIZES.base, color: C.white },
  });
}
