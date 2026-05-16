/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import App from './App';
import { name as appName } from './app.json';
import { useAdMobInit, useAppOpenAd } from './src/hooks/useAdMob';

function Root() {
  useAdMobInit();
  useAppOpenAd();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
      <Toast position="bottom" bottomOffset={40} />
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Root);
