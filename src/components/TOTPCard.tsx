import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { Account } from '../types';
import { useTOTP } from '../hooks/useTOTP';
import CountdownRing from './CountdownRing';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';
import { getServiceColor, getServiceInitial } from '../utils/serviceLogos';
import { useAccountStore } from '../store/accountStore';

interface Props {
  account: Account;
}

function TOTPCard({ account }: Props) {
  const { formattedCode, code } = useTOTP(account);
  const removeAccount = useAccountStore(s => s.removeAccount);

  const handlePress = useCallback(() => {
    Clipboard.setString(code);
    Toast.show({
      type: 'success',
      text1: 'Code Copied!',
      text2: 'Clears in 30 seconds',
      visibilityTime: 2000,
    });
    setTimeout(() => Clipboard.setString(''), 30000);
  }, [code]);

  const handleLongPress = useCallback(() => {
    Alert.alert(account.issuer, 'What would you like to do?', [
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          removeAccount(account.id);
          Toast.show({
            type: 'info',
            text1: 'Account Deleted',
            text2: 'Moved to Recently Deleted',
          });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [account, removeAccount]);

  const serviceColor = getServiceColor(account.issuer);
  const initial = getServiceInitial(account.issuer);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}>
      <View style={[styles.logo, { backgroundColor: serviceColor }]}>
        <Text style={styles.logoText}>{initial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.issuer} numberOfLines={1}>
          {account.issuer}
        </Text>
        {account.username ? (
          <Text style={styles.username} numberOfLines={1}>
            {account.username}
          </Text>
        ) : null}
        <View style={styles.codeRow}>
          <Text style={styles.code}>{formattedCode}</Text>
          <Icon name="copy-outline" size={16} color={COLORS.textLight} style={styles.copyIcon} />
        </View>
      </View>

      <CountdownRing period={account.period} />
    </TouchableOpacity>
  );
}

export default React.memo(TOTPCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.radius,
    padding: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  issuer: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  username: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  code: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 3,
    fontFamily: 'monospace',
  },
  copyIcon: {
    marginLeft: 8,
    marginTop: 4,
  },
});
