import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibrary } from 'react-native-image-picker';
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColors, AppColors, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';
import { useAccountStore } from '../store/accountStore';
import { parseOtpAuthUri } from '../utils/otpauth';

type Nav = StackNavigationProp<RootStackParamList>;

interface OptionRowProps {
  iconName: string;
  label: string;
  onPress: () => void;
  showBorder?: boolean;
}

function OptionRow({ iconName, label, onPress, showBorder = true }: OptionRowProps) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.optionRow, showBorder && styles.optionBorder]}>
      <View style={styles.optionIcon}>
        <Icon name={iconName} size={22} color={COLORS.primary} />
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
      <Icon name="chevron-forward" size={16} color={COLORS.textLight} />
    </TouchableOpacity>
  );
}

export default function FABMenu() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<Nav>();
  const addAccount = useAccountStore(s => s.addAccount);

  const openSheet = useCallback(() => setVisible(true), []);
  const closeSheet = useCallback(() => setVisible(false), []);

  const handleScanQR = useCallback(() => {
    closeSheet();
    setTimeout(() => navigation.navigate('QRScanner'), 250);
  }, [closeSheet, navigation]);

  const handleManual = useCallback(() => {
    closeSheet();
    setTimeout(() => navigation.navigate('ManualEntry'), 250);
  }, [closeSheet, navigation]);

  const handleUploadPhoto = useCallback(async () => {
    closeSheet();
    setTimeout(async () => {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: false });
      const asset = result.assets?.[0];
      if (result.didCancel || !asset) return;

      // On Android, image picker returns content:// URIs — MLKit handles these natively
      const imageUri = asset.uri ?? '';
      if (!imageUri) return;

      const barcodes = await BarcodeScanning.scan(imageUri);
      if (!barcodes.length || !barcodes[0].value) {
        Alert.alert('No QR Code Found', 'No QR code was detected in the selected image. Please try a clearer photo.');
        return;
      }

      const parsed = parseOtpAuthUri(barcodes[0].value);
      if (!parsed?.secret || !parsed?.issuer) {
        Alert.alert('Invalid QR Code', 'This image does not contain a valid 2FA setup QR code.');
        return;
      }

      addAccount({
        issuer: parsed.issuer,
        accountName: parsed.accountName ?? '',
        secret: parsed.secret,
        algorithm: parsed.algorithm ?? 'SHA1',
        digits: parsed.digits ?? 6,
        period: parsed.period ?? 30,
      });

      Toast.show({
        type: 'success',
        text1: 'Account Added!',
        text2: `${parsed.issuer} has been added successfully.`,
      });
    }, 250);
  }, [closeSheet, addAccount]);

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={openSheet} activeOpacity={0.85}>
        <Icon name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={closeSheet}
        statusBarTranslucent>
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>
          <View style={styles.indicator} />
          <Text style={styles.sheetTitle}>Add a new authentication key</Text>
          <View style={styles.underline} />

          <OptionRow iconName="qr-code-outline" label="Scan QR Code" onPress={handleScanQR} />
          <OptionRow iconName="image-outline" label="Upload Photo" onPress={handleUploadPhoto} />
          <OptionRow
            iconName="pencil-outline"
            label="Add Manual"
            onPress={handleManual}
            showBorder={false}
          />
        </View>
      </Modal>
    </>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: C.primary,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
      shadowColor: C.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheet: {
      backgroundColor: C.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingBottom: 32,
    },
    indicator: {
      width: 40,
      height: 4,
      backgroundColor: C.border,
      borderRadius: 2,
      alignSelf: 'center',
      marginTop: 12,
      marginBottom: 4,
    },
    sheetTitle: {
      fontSize: SIZES.base,
      fontWeight: '600',
      color: C.textPrimary,
      textAlign: 'center',
      marginTop: 8,
    },
    underline: {
      width: 40,
      height: 2,
      backgroundColor: C.primary,
      alignSelf: 'center',
      marginTop: 6,
      marginBottom: 16,
      borderRadius: 1,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
    },
    optionBorder: {
      borderBottomWidth: 1,
      borderBottomColor: C.separator,
    },
    optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: C.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    optionLabel: {
      flex: 1,
      fontSize: SIZES.base,
      color: C.textPrimary,
      fontWeight: '500',
    },
  });
}
