import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AppState,
  AppStateStatus,
  StatusBar,
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
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { Account, RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const accounts = useAccountStore(s => s.accounts);
  const { biometricEnabled } = useSettingsStore();
  const { screenshotAllowed } = useSettingsStore();
  const { authenticate, checkAvailability } = useBiometrics();
  const { enableScreenshot, disableScreenshot } = useScreenshot();
  const appState = useRef(AppState.currentState);

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

  const renderItem = useCallback(
    ({ item }: { item: Account }) => <TOTPCard account={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Account) => item.id, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Authenticator</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('GuideList')}
            style={styles.headerBtn}>
            <Icon name="help-circle-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.headerBtn}>
            <Icon name="settings-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={accounts.length === 0 ? styles.emptyContainer : styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
      />

      {/* Guide Link */}
      <View style={styles.guideFooter}>
        <Text style={styles.guideText}>Need help with setup? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('GuideList')}>
          <Text style={styles.guideLink}>2FA Guide</Text>
        </TouchableOpacity>
      </View>

      {/* FAB */}
      <FABMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xl,
    color: COLORS.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    marginLeft: 16,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
  },
  guideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  guideText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  guideLink: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
});
