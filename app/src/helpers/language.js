import { NativeModules } from 'react-native';
import { isIOS } from 'helpers/constants/environment';

import { messages } from 'helpers/locales/locales';

export const getLanguage = () => {
  let deviceLanguage = isIOS
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;
  deviceLanguage = deviceLanguage.slice(0, 2);

  if (!Object.keys(messages).includes(deviceLanguage)) {
    return 'en';
  }
  return deviceLanguage;
};
