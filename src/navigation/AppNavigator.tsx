import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSettingsStore } from '../store/settingsStore';
import { useBiometrics } from '../hooks/useBiometrics';
import { COLORS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

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
      <Icon name="shield-checkmark" size={64} color={COLORS.primary} />
      <Text style={splash.title}>2FA Authenticator</Text>
      <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 24 }} />
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
  const { biometricEnabled } = useSettingsStore();
  const { authenticate, checkAvailability } = useBiometrics();

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    setIsLoading(true);
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

  if (isLoading) return <SplashScreen />;
  if (!isAuthenticated) return <BiometricLockScreen onRetry={initAuth} />;

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
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
          cardStyle: { backgroundColor: COLORS.background },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{ title: 'Scan QR Code' }}
        />
        <Stack.Screen
          name="ManualEntry"
          component={ManualEntryScreen}
          options={{ title: 'Add Setup Key' }}
        />
        <Stack.Screen
          name="GuideList"
          component={GuideListScreen}
          options={{ title: '2FA Guide' }}
        />
        <Stack.Screen
          name="GuideDetail"
          component={GuideDetailScreen}
          options={({ route }) => ({ title: route.params.service.name })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="RecentlyDeleted"
          component={RecentlyDeletedScreen}
          options={{ title: 'Recently Deleted' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const splash = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    gap: 12,
  },
  title: {
    fontSize: SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

const lock = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 32,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sub: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontSize: SIZES.base,
    fontWeight: '700',
  },
});
