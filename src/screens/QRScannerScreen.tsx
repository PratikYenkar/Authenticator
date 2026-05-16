import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Alert, Animated, TouchableOpacity, PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraType } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useAccountStore } from '../store/accountStore';
import { parseOtpAuthUri } from '../utils/otpauth';
import { useColors, AppColors, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

export default function QRScannerScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const navigation = useNavigation<Nav>();
  const addAccount = useAccountStore(s => s.addAccount);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const scannedRef = useRef(false);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestCameraPermission();
    startScanAnimation();
  }, []);

  const requestCameraPermission = async () => {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs camera access to scan QR codes.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );
    setHasPermission(result === PermissionsAndroid.RESULTS.GRANTED);
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ]),
    ).start();
  };

  const handleReadCode = useCallback(
    (event: { nativeEvent: { codeStringValue: string } }) => {
      if (scannedRef.current) return;
      const data = event.nativeEvent.codeStringValue;
      if (!data) return;

      scannedRef.current = true;

      const parsed = parseOtpAuthUri(data);
      if (!parsed || !parsed.secret || !parsed.issuer) {
        Alert.alert(
          'Invalid QR Code',
          'This QR code does not contain a valid 2FA setup link. Please scan a valid otpauth:// QR code.',
          [{
            text: 'Try Again',
            onPress: () => { scannedRef.current = false; },
          }],
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
    },
    [addAccount, navigation],
  );

  const scanLineTranslate = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Icon name="camera-outline" size={56} color={COLORS.textLight} />
        <Text style={styles.permText}>Requesting camera permission…</Text>
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
      <Camera
        style={StyleSheet.absoluteFill}
        cameraType={CameraType.Back}
        scanBarcode
        onReadCode={handleReadCode}
        showFrame={false}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
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
        </View>
      </View>
    </View>
  );
}

function makeStyles(C: AppColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    center: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      backgroundColor: C.background, padding: 20, gap: 12,
    },
    permText: { fontSize: SIZES.base, color: C.textSecondary, textAlign: 'center' },
    retryBtn: {
      marginTop: 4, backgroundColor: C.primary,
      paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8,
      flexDirection: 'row', alignItems: 'center',
    },
    retryText: { color: C.white, fontWeight: '600' },
    overlay: { flex: 1 },
    overlayTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
    overlayMiddle: { flexDirection: 'row', height: 250 },
    overlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
    viewfinder: { width: 250, height: 250, overflow: 'hidden' },
    corner: { position: 'absolute', width: 30, height: 30, borderColor: '#fff' },
    cornerTL: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
    cornerTR: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
    cornerBL: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
    cornerBR: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
    scanLine: {
      position: 'absolute', left: 0, right: 0, height: 2,
      backgroundColor: C.primary, opacity: 0.8,
    },
    overlayBottom: {
      flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
      alignItems: 'center', paddingTop: 20, paddingHorizontal: 20, gap: 4,
    },
    hint: { color: '#fff', fontSize: SIZES.base, textAlign: 'center', marginTop: 4 },
    guideRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
    guideText: { color: 'rgba(255,255,255,0.75)', fontSize: SIZES.sm },
    guideLink: { color: C.primary, fontSize: SIZES.sm, fontWeight: '600' },
  });
}
