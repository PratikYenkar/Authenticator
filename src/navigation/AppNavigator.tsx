import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { useSettingsStore } from '../store/settingsStore';
import { useTranslation } from '../hooks/useTranslation';
import { useBiometrics } from '../hooks/useBiometrics';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';
import GuideListScreen from '../screens/GuideListScreen';
import GuideDetailScreen from '../screens/GuideDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecentlyDeletedScreen from '../screens/RecentlyDeletedScreen';
import PasswordManagerScreen from '../screens/PasswordManagerScreen';
import GeneratePasswordScreen from '../screens/GeneratePasswordScreen';
import ManagePasswordScreen from '../screens/ManagePasswordScreen';
import CreateEntryScreen from '../screens/CreateEntryScreen';
import ImportGoogleAuthScreen from '../screens/ImportGoogleAuthScreen';
import LanguageScreen from '../screens/LanguageScreen';
import HowToUseScreen from '../screens/HowToUseScreen';

const Stack = createStackNavigator<RootStackParamList>();

function SplashScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const t = useTranslation();
  return (
    <View style={styles.splashContainer}>
      <LottieView
        source={require('../assets/security-lock.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.splashTitle}>{t.appName}</Text>
      <Text style={styles.splashSub}>{t.splashSub}</Text>
    </View>
  );
}

function BiometricLockScreen({ onRetry }: { onRetry: () => void }) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const t = useTranslation();
  return (
    <View style={styles.lockContainer}>
      <View style={styles.lockIconWrap}>
        <Icon name="lock-closed" size={48} color={COLORS.primary} />
      </View>
      <Text style={styles.lockTitle}>{t.lockTitle}</Text>
      <Text style={styles.lockSub}>{t.lockSub}</Text>
      <TouchableOpacity style={styles.lockBtn} onPress={onRetry} activeOpacity={0.85}>
        <Icon name="finger-print" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
        <Text style={styles.lockBtnText}>{t.lockBtn}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AppNavigator() {
  const COLORS = useColors();
  const t = useTranslation();
  const darkMode = useSettingsStore(s => s.darkMode);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  // Start hydrated=true only if the store already rehydrated synchronously
  const [hydrated, setHydrated] = useState(() => useSettingsStore.persist.hasHydrated());
  const { biometricEnabled, hasOnboarded, setHasOnboarded } = useSettingsStore();
  const { authenticate, checkAvailability } = useBiometrics();

  // Wait for async storage hydration before reading hasOnboarded
  useEffect(() => {
    if (hydrated) return;
    const unsub = useSettingsStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  useEffect(() => {
    if (hydrated) initApp();
  }, [hydrated]);

  const initApp = async () => {
    setIsLoading(true);
    await Promise.all([
      new Promise(res => setTimeout(res, 3000)),
      (async () => {
        if (!hasOnboarded) {
          setShowOnboarding(true);
        } else {
          await runAuthCheck(false);
        }
      })(),
    ]);
    setIsLoading(false);
  };

  const runAuthCheck = async (updateLoading = true) => {
    if (updateLoading) setIsLoading(true);
    if (biometricEnabled) {
      const available = await checkAvailability();
      if (available) {
        const success = await authenticate('Unlock 2FA Authenticator');
        setIsAuthenticated(success);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(true);
    }
    if (updateLoading) setIsLoading(false);
  };

  const handleOnboardingDone = useCallback(async () => {
    setHasOnboarded(true);
    setShowOnboarding(false);
    await runAuthCheck();
  }, []);

  if (isLoading) return <SplashScreen />;
  if (showOnboarding) return <OnboardingScreen onDone={handleOnboardingDone} />;
  if (!isAuthenticated) return <BiometricLockScreen onRetry={runAuthCheck} />;

  const navTheme = darkMode
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: COLORS.background, card: COLORS.background, text: COLORS.textPrimary, border: COLORS.border } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: COLORS.background, card: COLORS.background, text: COLORS.textPrimary, border: COLORS.border } };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: { fontFamily: FONTS.semiBold, fontSize: 18 },
          cardStyle: { backgroundColor: COLORS.background },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: t.scanQRCode }} />
        <Stack.Screen name="ManualEntry" component={ManualEntryScreen} options={{ title: t.addSetupKey }} />
        <Stack.Screen name="GuideList" component={GuideListScreen} options={{ title: t.guide2FA }} />
        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} options={({ route }) => ({ title: route.params.service.name })} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t.settings }} />
        <Stack.Screen name="RecentlyDeleted" component={RecentlyDeletedScreen} options={{ title: t.recentlyDeleted }} />
        <Stack.Screen name="PasswordManager" component={PasswordManagerScreen} options={{ title: t.passwordManager }} />
        <Stack.Screen name="GeneratePassword" component={GeneratePasswordScreen} options={{ title: t.generatePassword }} />
        <Stack.Screen name="ManagePassword" component={ManagePasswordScreen} options={{ title: t.managePassword }} />
        <Stack.Screen name="CreateEntry" component={CreateEntryScreen} options={({ route }) => ({ title: route.params.type === 'website' ? 'Add Website' : 'Add Note' })} />
        <Stack.Screen name="ImportGoogleAuth" component={ImportGoogleAuthScreen} options={{ title: t.importGoogleAuth }} />
        <Stack.Screen name="Language" component={LanguageScreen} options={{ title: t.language }} />
        <Stack.Screen name="HowToUse" component={HowToUseScreen} options={{ title: t.howToUse }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    splashContainer: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      backgroundColor: C.background, gap: 10,
    },
    splashTitle: {
      fontFamily: FONTS.bold, fontSize: SIZES.xxxl,
      color: C.primary, marginTop: 4,
    },
    splashSub: {
      fontFamily: FONTS.regular, fontSize: SIZES.md,
      color: C.textSecondary,
    },
    lockContainer: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      backgroundColor: C.background, padding: 32,
    },
    lockIconWrap: {
      width: 96, height: 96, borderRadius: 48,
      backgroundColor: C.primaryLight,
      alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    },
    lockTitle: {
      fontFamily: FONTS.bold, fontSize: SIZES.xxl,
      color: C.textPrimary,
    },
    lockSub: {
      fontFamily: FONTS.regular, fontSize: SIZES.base,
      color: C.textSecondary, textAlign: 'center',
      marginTop: 8, marginBottom: 32,
    },
    lockBtn: {
      backgroundColor: C.primary, paddingHorizontal: 32,
      paddingVertical: 14, borderRadius: 12,
      flexDirection: 'row', alignItems: 'center',
    },
    lockBtnText: {
      fontFamily: FONTS.semiBold, color: C.white, fontSize: SIZES.base,
    },
  });
}
