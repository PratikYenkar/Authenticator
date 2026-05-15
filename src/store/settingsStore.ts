import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { keychainStorage } from '../utils/storage';

interface SettingsState {
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  screenshotAllowed: boolean;
  darkMode: boolean;
  language: string;
  isPremium: boolean;
  hasOnboarded: boolean;
  setBiometric: (val: boolean) => void;
  setNotifications: (val: boolean) => void;
  setScreenshot: (val: boolean) => void;
  setDarkMode: (val: boolean) => void;
  setLanguage: (val: string) => void;
  setPremium: (val: boolean) => void;
  setHasOnboarded: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      biometricEnabled: false,
      notificationsEnabled: false,
      screenshotAllowed: true,
      darkMode: false,
      language: 'en',
      isPremium: false,
      hasOnboarded: false,
      setBiometric: val => set({ biometricEnabled: val }),
      setNotifications: val => set({ notificationsEnabled: val }),
      setScreenshot: val => set({ screenshotAllowed: val }),
      setDarkMode: val => set({ darkMode: val }),
      setLanguage: val => set({ language: val }),
      setPremium: val => set({ isPremium: val }),
      setHasOnboarded: val => set({ hasOnboarded: val }),
    }),
    {
      name: 'app_settings_v1',
      storage: createJSONStorage(() => keychainStorage),
    },
  ),
);
