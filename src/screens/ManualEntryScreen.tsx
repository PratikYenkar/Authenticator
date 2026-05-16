import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useAccountStore } from '../store/accountStore';
import { validateBase32, validateAccountName } from '../utils/validators';
import { getServiceColor, getServiceInitial } from '../utils/serviceLogos';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

export default function ManualEntryScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation();
  const addAccount = useAccountStore(s => s.addAccount);

  const [issuer, setIssuer] = useState('');
  const [secret, setSecret] = useState('');
  const [username, setUsername] = useState('');

  const secretTouched = secret.length > 0;
  const secretValid = validateBase32(secret);
  const issuerValid = validateAccountName(issuer);
  const canSubmit = issuerValid && secretValid;

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;

    addAccount({
      issuer: issuer.trim(),
      accountName: issuer.trim(),
      username: username.trim() || undefined,
      secret: secret.trim().toUpperCase().replace(/\s/g, ''),
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
    });

    Toast.show({
      type: 'success',
      text1: 'Account Added Successfully',
      text2: `${issuer.trim()} has been added.`,
    });

    navigation.goBack();
  }, [canSubmit, issuer, secret, username, addAccount, navigation]);

  const serviceColor = issuer ? getServiceColor(issuer) : COLORS.textLight;
  const initial = issuer ? getServiceInitial(issuer) : '?';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Account</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={issuer}
                onChangeText={setIssuer}
                placeholder="e.g. Google, Facebook"
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <View style={[styles.logoPreview, { backgroundColor: serviceColor }]}>
                <Text style={styles.logoText}>{initial}</Text>
              </View>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Secret Key</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[
                  styles.input,
                  styles.inputFlex,
                  secretTouched && !secretValid && styles.inputError,
                ]}
                value={secret}
                onChangeText={setSecret}
                placeholder="Enter setup key (Base32)"
                placeholderTextColor={COLORS.textLight}
                autoCapitalize="characters"
                autoCorrect={false}
                returnKeyType="next"
              />
              {secretTouched && (
                <Icon
                  name={secretValid ? 'checkmark-circle' : 'close-circle'}
                  size={22}
                  color={secretValid ? COLORS.success : COLORS.danger}
                  style={styles.validationIcon}
                />
              )}
            </View>
            {secretTouched && !secretValid && (
              <View style={styles.errorRow}>
                <Icon name="alert-circle-outline" size={14} color={COLORS.danger} />
                <Text style={styles.errorText}> Invalid secret key format (must be Base32)</Text>
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Username (Optional)</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="e.g. user@example.com"
              placeholderTextColor={COLORS.textLight}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit}
            activeOpacity={0.85}>
            <Icon name="add-circle-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Add Token</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: C.background,
    },
    scroll: {
      padding: 16,
      paddingBottom: 40,
    },
    sectionTitle: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.xl,
      color: C.textPrimary,
      marginTop: 24,
      marginBottom: 16,
    },
    fieldGroup: {
      marginBottom: 22,
    },
    label: {
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.xs,
      color: C.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    inputWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputFlex: {
      flex: 1,
    },
    input: {
      borderWidth: 1.5,
      borderColor: C.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontFamily: FONTS.regular,
      fontSize: SIZES.base,
      color: C.textPrimary,
      backgroundColor: C.backgroundGray,
    },
    inputError: {
      borderColor: C.danger,
    },
    validationIcon: {
      position: 'absolute',
      right: 12,
    },
    errorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    errorText: {
      fontSize: SIZES.xs,
      color: C.danger,
    },
    logoPreview: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      fontFamily: FONTS.bold,
      color: C.white,
      fontSize: SIZES.lg,
    },
    button: {
      backgroundColor: C.primary,
      borderRadius: 28,
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    buttonDisabled: {
      backgroundColor: C.textLight,
    },
    buttonText: {
      fontFamily: FONTS.bold,
      color: C.white,
      fontSize: SIZES.base,
    },
  });
}
