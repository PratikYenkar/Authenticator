import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSettingsStore } from '../store/settingsStore';
import { useBiometrics } from '../hooks/useBiometrics';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';
import GuideListScreen from '../screens/GuideListScreen';
import GuideDetailScreen from '../screens/GuideDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecentlyDeletedScreen from '../screens/RecentlyDeletedScreen';

const Stack = createStackNavigator<RootStackParamList>();

function SplashScreen() {
  return (
    <View style={splash.container}>
      <Icon name="shield-checkmark" size={72} color={COLORS.primary} />
      <Text style={splash.title}>Authenticator</Text>
      <Text style={splash.sub}>Your security, simplified</Text>
      <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 32 }} />
    </View>
  );
}

function BiometricLockScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={lock.container}>
      <View style={lock.iconWrap}>
        <Icon name="lock-closed" size={48} color={COLORS.primary} />
      </View>
      <Text style={lock.title}>App Locked</Text>
      <Text style={lock.sub}>Authenticate to unlock your 2FA codes</Text>
      <TouchableOpacity style={lock.btn} onPress={onRetry} activeOpacity={0.85}>
        <Icon name="finger-print" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
        <Text style={lock.btnText}>Unlock with Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { biometricEnabled, hasOnboarded, setHasOnboarded } = useSettingsStore();
  const { authenticate, checkAvailability } = useBiometrics();

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    setIsLoading(true);
    if (!hasOnboarded) {
      setShowOnboarding(true);
      setIsLoading(false);
      return;
    }
    await runAuthCheck();
  };

  const runAuthCheck = async () => {
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
    setIsLoading(false);
  };

  const handleOnboardingDone = useCallback(async () => {
    setHasOnboarded(true);
    setShowOnboarding(false);
    setIsLoading(true);
    await runAuthCheck();
  }, []);

  if (isLoading) return <SplashScreen />;
  if (showOnboarding) return <OnboardingScreen onDone={handleOnboardingDone} />;
  if (!isAuthenticated) return <BiometricLockScreen onRetry={runAuthCheck} />;

  return (
    <NavigationContainer>
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
        <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scan QR Code' }} />
        <Stack.Screen name="ManualEntry" component={ManualEntryScreen} options={{ title: 'Add Setup Key' }} />
        <Stack.Screen name="GuideList" component={GuideListScreen} options={{ title: '2FA Guide' }} />
        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} options={({ route }) => ({ title: route.params.service.name })} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="RecentlyDeleted" component={RecentlyDeletedScreen} options={{ title: 'Recently Deleted' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const splash = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.background, gap: 10,
  },
  title: {
    fontFamily: FONTS.bold, fontSize: SIZES.xxxl,
    color: COLORS.primary, marginTop: 4,
  },
  sub: {
    fontFamily: FONTS.regular, fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
});

const lock = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.background, padding: 32,
  },
  iconWrap: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold, fontSize: SIZES.xxl,
    color: COLORS.textPrimary,
  },
  sub: {
    fontFamily: FONTS.regular, fontSize: SIZES.base,
    color: COLORS.textSecondary, textAlign: 'center',
    marginTop: 8, marginBottom: 32,
  },
  btn: {
    backgroundColor: COLORS.primary, paddingHorizontal: 32,
    paddingVertical: 14, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center',
  },
  btnText: {
    fontFamily: FONTS.semiBold, color: COLORS.white, fontSize: SIZES.base,
  },
});
