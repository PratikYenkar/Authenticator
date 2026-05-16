import React, { useCallback } from 'react';
import {
  ScrollView,
  Alert,
  Linking,
  Share,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { useSettingsStore } from '../store/settingsStore';
import { useBiometrics } from '../hooks/useBiometrics';
import { useScreenshot } from '../hooks/useScreenshot';
import PremiumBanner from '../components/PremiumBanner';
import SectionHeader from '../components/SectionHeader';
import SettingsRow from '../components/SettingsRow';
import { useColors, AppColors } from '../constants/theme';
import { useTranslation } from '../hooks/useTranslation';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const t = useTranslation();
  const navigation = useNavigation<Nav>();
  const {
    biometricEnabled,
    notificationsEnabled,
    screenshotAllowed,
    darkMode,
    setBiometric,
    setNotifications,
    setScreenshot,
    setDarkMode,
  } = useSettingsStore();

  const { checkAvailability, authenticate } = useBiometrics();
  const { enableScreenshot, disableScreenshot } = useScreenshot();

  const handleBiometricToggle = useCallback(
    async (val: boolean) => {
      if (val) {
        const available = await checkAvailability();
        if (!available) {
          Alert.alert(
            'Biometrics Unavailable',
            'Your device does not support biometric authentication or no biometrics are enrolled.',
          );
          return;
        }
        const success = await authenticate('Confirm to enable biometric lock');
        if (!success) {
          Toast.show({ type: 'error', text1: 'Authentication Failed' });
          return;
        }
      }
      setBiometric(val);
      Toast.show({
        type: 'success',
        text1: val ? 'Biometric Lock Enabled' : 'Biometric Lock Disabled',
      });
    },
    [checkAvailability, authenticate, setBiometric],
  );

  const handleScreenshotToggle = useCallback(
    (val: boolean) => {
      setScreenshot(val);
      if (val) {
        enableScreenshot();
      } else {
        disableScreenshot();
      }
    },
    [setScreenshot, enableScreenshot, disableScreenshot],
  );

  const handleLanguage = useCallback(() => {
    navigation.navigate('Language');
  }, [navigation]);

  const handleHowToUse = useCallback(() => {
    navigation.navigate('HowToUse');
  }, [navigation]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message:
          '2FA Authenticator — Secure your accounts with Two-Factor Authentication. Download now!',
      });
    } catch {
      // User cancelled
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PremiumBanner />

        <SectionHeader title={t.preferences} />
        <SettingsRow
          icon="key-outline"
          label={t.passwordManager}
          onPress={() => navigation.navigate('PasswordManager')}
        />
        <SettingsRow
          icon="trash-outline"
          label={t.recentlyDeleted}
          onPress={() => navigation.navigate('RecentlyDeleted')}
        />
        <SettingsRow
          icon="language-outline"
          label={t.changeLanguage}
          onPress={handleLanguage}
        />

        <SectionHeader title={t.authorize} />
        <SettingsRow
          icon="finger-print-outline"
          label={t.biometricLock}
          sublabel={t.biometricSub}
          type="switch"
          value={biometricEnabled}
          onValueChange={handleBiometricToggle}
        />
        <SettingsRow
          icon="notifications-outline"
          label={t.notifications}
          type="switch"
          value={notificationsEnabled}
          onValueChange={setNotifications}
        />
        <SettingsRow
          icon="camera-outline"
          label={t.allowScreenshot}
          sublabel={t.screenshotSub}
          type="switch"
          value={screenshotAllowed}
          onValueChange={handleScreenshotToggle}
        />
        <SettingsRow
          icon="moon-outline"
          label={t.darkMode}
          type="switch"
          value={darkMode}
          onValueChange={setDarkMode}
        />

        <SectionHeader title={t.guides} />
        <SettingsRow
          icon="logo-google"
          label={t.importGoogle}
          onPress={() => navigation.navigate('ImportGoogleAuth')}
        />
        <SettingsRow
          icon="book-outline"
          label={t.guide2FA}
          onPress={() => navigation.navigate('GuideList')}
        />
        <SettingsRow
          icon="help-circle-outline"
          label={t.howToUse}
          onPress={handleHowToUse}
        />

        <SectionHeader title={t.controlSettings} />
        <SettingsRow
          icon="shield-outline"
          label={t.privacyPolicy}
          onPress={() => Linking.openURL('https://privacypolicybypratik.blogspot.com/2026/05/privacy-policy-this-privacy-policy.html')}
        />
        <SettingsRow
          icon="share-social-outline"
          label={t.shareWithFriends}
          onPress={handleShare}
        />
        {/* <SettingsRow
          icon="star-outline"
          label={t.rateUs}
          onPress={() => Alert.alert(t.rateUs, 'Thank you for using 2FA Authenticator! Please leave a review on the Play Store.')}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: C.backgroundGray,
    },
  });
}
