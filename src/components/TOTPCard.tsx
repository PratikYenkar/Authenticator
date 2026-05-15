import React, { useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { Account } from '../types';
import { useTOTP } from '../hooks/useTOTP';
import CountdownRing from './CountdownRing';
import ServiceLogo from './ServiceLogo';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';
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
      text2: 'Auto-clears in 30 seconds',
      visibilityTime: 2000,
    });
    setTimeout(() => Clipboard.setString(''), 30000);
  }, [code]);

  const handleLongPress = useCallback(() => {
    Alert.alert(account.issuer, 'What would you like to do?', [
      {
        text: 'Delete Account',
        style: 'destructive',
        onPress: () => {
          removeAccount(account.id);
          Toast.show({ type: 'info', text1: 'Moved to Recently Deleted' });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [account, removeAccount]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.75}>

      <ServiceLogo issuer={account.issuer} size={46} />

      <View style={styles.info}>
        <Text style={styles.issuer} numberOfLines={1}>{account.issuer}</Text>
        {account.username ? (
          <Text style={styles.username} numberOfLines={1}>{account.username}</Text>
        ) : null}
        <View style={styles.codeRow}>
          <Text style={styles.code}>{formattedCode}</Text>
          <Icon name="copy-outline" size={14} color={COLORS.textLight} style={styles.copyIcon} />
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
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  issuer: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
  },
  username: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  code: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.primary,
    letterSpacing: 3,
  },
  copyIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
});
