import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useAccountStore } from '../store/accountStore';
import { parseOtpAuthUri } from '../utils/otpauth';
import { COLORS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

export default function QRScannerScreen() {
  const navigation = useNavigation<Nav>();
  const addAccount = useAccountStore(s => s.addAccount);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestCameraPermission();
    startScanAnimation();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: '2FA Authenticator needs camera to scan QR codes.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } else {
      setHasPermission(true);
    }
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const handleBarCodeScanned = (data: string) => {
    if (scanned) return;
    setScanned(true);

    const parsed = parseOtpAuthUri(data);
    if (!parsed || !parsed.secret || !parsed.issuer) {
      Alert.alert(
        'Invalid QR Code',
        'This QR code does not contain a valid 2FA setup link. Please scan a valid otpauth:// QR code.',
        [{ text: 'Try Again', onPress: () => setScanned(false) }],
      );
      return;
    }

    addAccount({
      issuer: parsed.issuer ?? 'Unknown',
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

    navigation.goBack();
  };

  const scanLineTranslate = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Icon name="camera-outline" size={56} color={COLORS.textLight} />
        <Text style={styles.permText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Icon name="camera-off-outline" size={56} color={COLORS.danger} />
        <Text style={styles.permText}>Camera permission denied.</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.retryBtn}>
          <Icon name="shield-checkmark-outline" size={18} color={COLORS.white} style={{ marginRight: 6 }} />
          <Text style={styles.retryText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <View style={styles.viewfinder}>
            {/* Corners */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            {/* Scan line */}
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY: scanLineTranslate }] }]}
            />
          </View>
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom}>
          <Icon name="qr-code-outline" size={28} color="rgba(255,255,255,0.6)" />
          <Text style={styles.hint}>Place a QR code inside the viewfinder</Text>
          <View style={styles.guideRow}>
            <Icon name="help-circle-outline" size={14} color="rgba(255,255,255,0.75)" />
            <Text style={styles.guideText}> Confused How To Add Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('GuideList')}>
              <Text style={styles.guideLink}>Read Here</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.manualBtn}
            onPress={() => {
              handleBarCodeScanned(
                'otpauth://totp/Test%3Ademo%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Test&algorithm=SHA1&digits=6&period=30',
              );
            }}>
            <Icon name="flask-outline" size={16} color={COLORS.white} style={{ marginRight: 6 }} />
            <Text style={styles.manualBtnText}>Test with Demo Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
    gap: 12,
  },
  permText: {
    fontSize: SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: 250,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  viewfinder: {
    width: 250,
    height: 250,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.white,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 4,
  },
  hint: {
    color: COLORS.white,
    fontSize: SIZES.base,
    textAlign: 'center',
    marginTop: 4,
  },
  guideRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  guideText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: SIZES.sm,
  },
  guideLink: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontWeight: '600',
  },
  manualBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  manualBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: SIZES.sm,
  },
});
