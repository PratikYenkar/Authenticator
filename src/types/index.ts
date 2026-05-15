export interface Account {
  id: string;
  issuer: string;
  accountName: string;
  username?: string;
  secret: string;
  algorithm: 'SHA1' | 'SHA256' | 'SHA512';
  digits: 6 | 8;
  period: 30 | 60;
  logoColor: string;
  createdAt: number;
}

export interface DeletedAccount extends Account {
  deletedAt: number;
}

export interface GuideStep {
  id: number;
  title: string;
  summary: string;
  detail: string;
}

export interface GuideService {
  id: string;
  name: string;
  domain: string;
  iconBg: string;
  steps: GuideStep[];
}

export interface AppSettings {
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  screenshotAllowed: boolean;
  darkMode: boolean;
  language: string;
  isPremium: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  QRScanner: undefined;
  ManualEntry: undefined;
  GuideList: undefined;
  GuideDetail: { service: GuideService };
  Settings: undefined;
  RecentlyDeleted: undefined;
};
