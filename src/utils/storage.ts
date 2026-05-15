import * as Keychain from 'react-native-keychain';

export const keychainStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const creds = await Keychain.getGenericPassword({ service: key });
      return creds ? creds.password : null;
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await Keychain.setGenericPassword('data', value, { service: key });
    } catch {
      // Silently fail — data won't persist but app stays functional
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await Keychain.resetGenericPassword({ service: key });
    } catch {
      // Silently fail
    }
  },
};
