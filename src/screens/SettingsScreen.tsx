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
import { COLORS } from '../constants/theme';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
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
    setLanguage,
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
    Alert.alert('Change Language', 'Select a language:', [
      { text: 'English', onPress: () => setLanguage('en') },
      { text: 'Spanish', onPress: () => setLanguage('es') },
      { text: 'French', onPress: () => setLanguage('fr') },
      { text: 'German', onPress: () => setLanguage('de') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [setLanguage]);

  const handleImportGoogle = useCallback(() => {
    Alert.alert(
      'Import from Google Authenticator',
      '1. Open Google Authenticator\n2. Tap the menu (three dots)\n3. Tap Export accounts\n4. Select the accounts you want to export\n5. Scan the QR code shown using this app\'s QR scanner',
      [{ text: 'Got It' }],
    );
  }, []);

  const handleHowToUse = useCallback(() => {
    Alert.alert(
      'How To Use',
      '1. Tap the + button to add an account\n2. Scan the QR code from your service\'s 2FA setup page\n3. Or enter the setup key manually\n4. The 6-digit code refreshes every 30 seconds\n5. Enter the code when logging in to verify your identity',
      [{ text: 'Got It' }],
    );
  }, []);

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

        <SectionHeader title="Preferences" />
        <SettingsRow
          icon="download-outline"
          label="Import / Export"
          onPress={() => Alert.alert('Coming Soon', 'Import/Export feature is coming soon!')}
        />
        <SettingsRow
          icon="trash-outline"
          label="Recently Deleted"
          onPress={() => navigation.navigate('RecentlyDeleted')}
        />
        <SettingsRow
          icon="key-outline"
          label="Password Manager"
          onPress={() => Alert.alert('Coming Soon', 'Password Manager integration coming soon!')}
        />
        <SettingsRow
          icon="language-outline"
          label="Change Language"
          onPress={handleLanguage}
        />

        <SectionHeader title="Authorize" />
        <SettingsRow
          icon="finger-print-outline"
          label="Biometric Lock"
          sublabel="Require biometrics to open app"
          type="switch"
          value={biometricEnabled}
          onValueChange={handleBiometricToggle}
        />
        <SettingsRow
          icon="notifications-outline"
          label="Notifications"
          type="switch"
          value={notificationsEnabled}
          onValueChange={setNotifications}
        />
        <SettingsRow
          icon="camera-outline"
          label="Allow Screenshot"
          sublabel="Disable for extra security"
          type="switch"
          value={screenshotAllowed}
          onValueChange={handleScreenshotToggle}
        />
        <SettingsRow
          icon="moon-outline"
          label="Dark Mode"
          sublabel="Coming soon"
          type="switch"
          value={darkMode}
          onValueChange={setDarkMode}
        />

        <SectionHeader title="Guides" />
        <SettingsRow
          icon="logo-google"
          label="How to Import Google Authenticator"
          onPress={handleImportGoogle}
        />
        <SettingsRow
          icon="book-outline"
          label="2FA Guide"
          onPress={() => navigation.navigate('GuideList')}
        />
        <SettingsRow
          icon="help-circle-outline"
          label="How To Use"
          onPress={handleHowToUse}
        />

        <SectionHeader title="Control Settings" />
        <SettingsRow
          icon="shield-outline"
          label="Privacy Policy"
          onPress={() => Alert.alert('Privacy Policy', 'Your privacy is our priority. We do not collect or share your 2FA secrets. All data is stored encrypted on your device.')}
        />
        <SettingsRow
          icon="share-social-outline"
          label="Share With Friends"
          onPress={handleShare}
        />
        <SettingsRow
          icon="apps-outline"
          label="More Apps"
          onPress={() => Alert.alert('More Apps', 'Visit the Play Store for more apps!')}
        />
        <SettingsRow
          icon="star-outline"
          label="Rate Us"
          onPress={() => Alert.alert('Rate Us', 'Thank you for using 2FA Authenticator! Please leave a review on the Play Store.')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
});
