import { useEffect, useRef, useState } from 'react';
import mobileAds, {
  InterstitialAd,
  AdEventType,
  AppOpenAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AppState, AppStateStatus } from 'react-native';
import { AD_UNIT_IDS } from '../constants/ads';

let adsInitialized = false;

export function useAdMobInit() {
  useEffect(() => {
    if (adsInitialized) return;
    mobileAds()
      .initialize()
      .then(() => { adsInitialized = true; });
  }, []);
}

export function useInterstitialAd() {
  const adRef = useRef<InterstitialAd | null>(null);
  const loadedRef = useRef(false);

  const load = () => {
    const ad = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial, {
      requestNonPersonalizedAdsOnly: false,
    });
    ad.addAdEventListener(AdEventType.LOADED, () => {
      loadedRef.current = true;
    });
    ad.addAdEventListener(AdEventType.CLOSED, () => {
      loadedRef.current = false;
      load();
    });
    ad.load();
    adRef.current = ad;
  };

  useEffect(() => {
    load();
    return () => { adRef.current = null; };
  }, []);

  const show = () => {
    if (adRef.current && loadedRef.current) {
      adRef.current.show();
      return true;
    }
    return false;
  };

  return { show };
}

export function useAppOpenAd() {
  const adRef = useRef<AppOpenAd | null>(null);
  const loadedRef = useRef(false);
  const shownOnLaunch = useRef(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const load = () => {
    const ad = AppOpenAd.createForAdRequest(AD_UNIT_IDS.appOpen, {
      requestNonPersonalizedAdsOnly: false,
    });
    ad.addAdEventListener(AdEventType.LOADED, () => {
      loadedRef.current = true;
      // Show once on first launch
      if (!shownOnLaunch.current) {
        shownOnLaunch.current = true;
        ad.show();
      }
    });
    ad.addAdEventListener(AdEventType.CLOSED, () => {
      loadedRef.current = false;
      load();
    });
    ad.load();
    adRef.current = ad;
  };

  useEffect(() => {
    load();

    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        if (adRef.current && loadedRef.current) {
          adRef.current.show();
        }
      }
      appState.current = next;
    });

    return () => {
      sub.remove();
      adRef.current = null;
    };
  }, []);
}
