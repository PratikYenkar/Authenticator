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
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

interface OptionRowProps {
  iconName: string;
  label: string;
  onPress: () => void;
  showBorder?: boolean;
}

function OptionRow({ iconName, label, onPress, showBorder = true }: OptionRowProps) {
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
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<Nav>();

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
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
      if (result.didCancel || !result.assets?.[0]) return;
      Alert.alert(
        'Photo Upload',
        'QR code reading from gallery requires a QR decode library. Please use the camera scanner or manual entry instead.',
      );
    }, 250);
  }, [closeSheet]);

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

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  sheetTitle: {
    fontSize: SIZES.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 8,
  },
  underline: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.primary,
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
    borderBottomColor: COLORS.separator,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionLabel: {
    flex: 1,
    fontSize: SIZES.base,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
});
