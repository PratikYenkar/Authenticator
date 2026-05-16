const TEST_MODE = true; // set false before release build

const TEST_IDS = {
  banner:       'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  appOpen:      'ca-app-pub-3940256099942544/9257395921',
};

const PROD_IDS = {
  banner:       'ca-app-pub-4092006829041769/4809406915',
  interstitial: 'ca-app-pub-4092006829041769/5880991601',
  appOpen:      'ca-app-pub-4092006829041769/8315583250',
};

export const AD_UNIT_IDS = TEST_MODE ? TEST_IDS : PROD_IDS;
