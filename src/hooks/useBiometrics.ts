import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export function useBiometrics() {
  const checkAvailability = async (): Promise<boolean> => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      return available;
    } catch {
      return false;
    }
  };

  const authenticate = async (reason: string = 'Verify your identity'): Promise<boolean> => {
    try {
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: reason });
      return success;
    } catch {
      return false;
    }
  };

  return { checkAvailability, authenticate };
}
