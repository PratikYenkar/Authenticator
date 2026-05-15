import { NativeModules } from 'react-native';

const { ScreenshotModule } = NativeModules;

export function useScreenshot() {
  const enableScreenshot = () => ScreenshotModule?.enable();
  const disableScreenshot = () => ScreenshotModule?.disable();
  return { enableScreenshot, disableScreenshot };
}
