import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColors, AppColors, FONTS, SIZES } from '../constants/theme';

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface Section {
  id: string;
  sectionTitle: string;
  accent: string;
  bgAccent: string;
  steps: Step[];
}

const SECTIONS: Section[] = [
  {
    id: 'add',
    sectionTitle: 'Adding an Account',
    accent: '#2563EB',
    bgAccent: '#EFF6FF',
    steps: [
      {
        icon: 'add-circle-outline',
        title: 'Tap the + button',
        description: 'On the home screen, tap the floating + button in the bottom-right corner to open the add menu.',
      },
      {
        icon: 'qr-code-outline',
        title: 'Scan a QR Code',
        description: "Choose \"Scan QR Code\" and point your camera at the QR code shown on your service's 2FA setup page.",
      },
      {
        icon: 'keypad-outline',
        title: 'Or enter manually',
        description: 'Choose \"Enter Setup Key\" and type the secret key shown by your service, along with the account name.',
      },
      {
        icon: 'checkmark-circle-outline',
        title: 'Account added',
        description: 'Your account now appears on the home screen and generates a fresh 6-digit code every 30 seconds.',
      },
    ],
  },
  {
    id: 'use',
    sectionTitle: 'Using Your Codes',
    accent: '#10B981',
    bgAccent: '#F0FDF4',
    steps: [
      {
        icon: 'eye-outline',
        title: 'View the code',
        description: 'Each card shows the current 6-digit OTP code and a countdown ring showing how many seconds remain.',
      },
      {
        icon: 'copy-outline',
        title: 'Copy with one tap',
        description: 'Tap anywhere on the code to copy it to your clipboard instantly. A toast confirms it was copied.',
      },
      {
        icon: 'time-outline',
        title: 'Code refreshes automatically',
        description: 'Codes refresh every 30 seconds. The ring turns red when a code is about to expire — wait for the next one if it\'s almost out.',
      },
      {
        icon: 'shield-checkmark-outline',
        title: 'Enter on the website',
        description: 'Paste or type the 6-digit code into the 2FA field on the website or app you are logging into.',
      },
    ],
  },
  {
    id: 'manage',
    sectionTitle: 'Managing Accounts',
    accent: '#F59E0B',
    bgAccent: '#FFFBEB',
    steps: [
      {
        icon: 'search-outline',
        title: 'Search your accounts',
        description: 'Use the search bar at the top of the home screen to quickly find an account by name or username.',
      },
      {
        icon: 'trash-outline',
        title: 'Delete an account',
        description: 'Long-press or swipe on an account card and tap Delete. The account moves to Recently Deleted.',
      },
      {
        icon: 'refresh-outline',
        title: 'Restore deleted accounts',
        description: 'Go to Settings → Recently Deleted to restore any account within 30 days before it is permanently removed.',
      },
    ],
  },
  {
    id: 'security',
    sectionTitle: 'Security & Privacy',
    accent: '#8B5CF6',
    bgAccent: '#F5F3FF',
    steps: [
      {
        icon: 'finger-print-outline',
        title: 'Enable Biometric Lock',
        description: 'Go to Settings → Biometric Lock to require fingerprint or face authentication every time the app opens.',
      },
      {
        icon: 'camera-outline',
        title: 'Disable screenshots',
        description: 'Turn off "Allow Screenshot" in Settings to prevent other apps or notifications from capturing your OTP codes.',
      },
      {
        icon: 'moon-outline',
        title: 'Dark mode',
        description: 'Toggle Dark Mode in Settings for a comfortable experience in low-light environments.',
      },
    ],
  },
  {
    id: 'password',
    sectionTitle: 'Password Manager',
    accent: '#EF4444',
    bgAccent: '#FFF1F2',
    steps: [
      {
        icon: 'key-outline',
        title: 'Open Password Manager',
        description: 'Go to Settings → Password Manager to store website credentials and secure notes in one place.',
      },
      {
        icon: 'globe-outline',
        title: 'Save a website login',
        description: 'Tap + → Website, fill in the site name, URL, username, and password, then save.',
      },
      {
        icon: 'document-text-outline',
        title: 'Save a secure note',
        description: 'Tap + → Note to store any private text — Wi-Fi passwords, recovery codes, PIN numbers, and more.',
      },
      {
        icon: 'flash-outline',
        title: 'Generate strong passwords',
        description: 'Use the Generate Password tool inside Password Manager to create random, strong passwords instantly.',
      },
    ],
  },
];

function StepCard({ step, index, accent, bgAccent }: {
  step: Step;
  index: number;
  accent: string;
  bgAccent: string;
}) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  return (
    <View style={styles.stepCard}>
      <View style={[styles.stepNumberWrap, { backgroundColor: bgAccent }]}>
        <Text style={[styles.stepNumber, { color: accent }]}>{index + 1}</Text>
      </View>
      <View style={[styles.stepIconWrap, { backgroundColor: bgAccent }]}>
        <Icon name={step.icon} size={22} color={accent} />
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepDesc}>{step.description}</Text>
      </View>
    </View>
  );
}

function SectionCard({ section }: { section: Section }) {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity
        style={[styles.sectionHeader, { backgroundColor: section.bgAccent }]}
        onPress={() => setExpanded(v => !v)}
        activeOpacity={0.8}>
        <View style={[styles.sectionAccentBar, { backgroundColor: section.accent }]} />
        <View style={styles.sectionHeaderContent}>
          <Text style={[styles.sectionTitle, { color: section.accent }]}>{section.sectionTitle}</Text>
          <View style={[styles.badge, { backgroundColor: section.accent + '20' }]}>
            <Text style={[styles.badgeText, { color: section.accent }]}>
              {section.steps.length} steps
            </Text>
          </View>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={section.accent}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.stepsWrap}>
          {section.steps.map((step, i) => (
            <React.Fragment key={i}>
              <StepCard
                step={step}
                index={i}
                accent={section.accent}
                bgAccent={section.bgAccent}
              />
              {i < section.steps.length - 1 && (
                <View style={[styles.connector, { backgroundColor: section.accent + '30' }]} />
              )}
            </React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
}

export default function HowToUseScreen() {
  const COLORS = useColors();
  const styles = makeStyles(COLORS);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero banner */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Icon name="help-buoy-outline" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.heroTitle}>How To Use</Text>
          <Text style={styles.heroSub}>
            Everything you need to know about 2FA Authenticator — from adding accounts to staying secure.
          </Text>
        </View>

        {SECTIONS.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}

        <View style={styles.tipBox}>
          <Icon name="bulb-outline" size={20} color={COLORS.warning} style={{ marginRight: 10 }} />
          <Text style={styles.tipText}>
            Tip: Never share your 6-digit codes or secret keys with anyone. They provide full access to your account.
          </Text>
        </View>
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
    scroll: {
      paddingBottom: 40,
    },
    hero: {
      backgroundColor: C.background,
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 28,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
      marginBottom: 16,
    },
    heroIconWrap: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: C.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    heroTitle: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.xxl,
      color: C.textPrimary,
      marginBottom: 8,
    },
    heroSub: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.base,
      color: C.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      maxWidth: 300,
    },
    sectionCard: {
      marginHorizontal: 16,
      marginBottom: 14,
      borderRadius: 16,
      backgroundColor: C.background,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: C.border,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    sectionAccentBar: {
      width: 4,
      height: 36,
      borderRadius: 2,
      marginRight: 12,
    },
    sectionHeaderContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    sectionTitle: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.md,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
    },
    badgeText: {
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.xs,
    },
    stepsWrap: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 4,
    },
    stepCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 12,
      gap: 12,
    },
    stepNumberWrap: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    stepNumber: {
      fontFamily: FONTS.bold,
      fontSize: SIZES.xs,
    },
    stepIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontFamily: FONTS.semiBold,
      fontSize: SIZES.base,
      color: C.textPrimary,
      marginBottom: 4,
    },
    stepDesc: {
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
      color: C.textSecondary,
      lineHeight: 20,
    },
    connector: {
      width: 2,
      height: 16,
      borderRadius: 1,
      marginLeft: 12,
    },
    tipBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginHorizontal: 16,
      marginTop: 4,
      padding: 16,
      backgroundColor: C.warning + '15',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: C.warning + '40',
    },
    tipText: {
      flex: 1,
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
      color: C.textSecondary,
      lineHeight: 20,
    },
  });
}
