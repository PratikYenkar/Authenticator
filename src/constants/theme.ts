import { Dimensions } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';

const { width, height } = Dimensions.get('window');

export const LIGHT_COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  background: '#FFFFFF',
  backgroundGray: '#F9FAFB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#FFFFFF',
  separator: '#F3F4F6',
};

export const DARK_COLORS = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#1E3A5F',
  background: '#111827',
  backgroundGray: '#1F2937',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textLight: '#6B7280',
  border: '#374151',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  white: '#FFFFFF',
  black: '#000000',
  cardBg: '#1F2937',
  separator: '#374151',
};

// Static fallback for non-component usage
export const COLORS = LIGHT_COLORS;

export type AppColors = typeof LIGHT_COLORS;

export function useColors(): AppColors {
  const darkMode = useSettingsStore(s => s.darkMode);
  return darkMode ? DARK_COLORS : LIGHT_COLORS;
}

export const FONTS = {
  regular: 'Urbanist-Regular',
  medium: 'Urbanist-Medium',
  semiBold: 'Urbanist-SemiBold',
  bold: 'Urbanist-Bold',
};

export const SIZES = {
  xs: 13,
  sm: 14,
  md: 16,
  base: 17,
  lg: 20,
  xl: 22,
  xxl: 26,
  xxxl: 32,
  padding: 16,
  radius: 12,
  radiusLg: 20,
  screenWidth: width,
  screenHeight: height,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};
