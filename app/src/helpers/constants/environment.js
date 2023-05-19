import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const KeyboardAvoidingViewBehavior = isIOS ? 'padding' : 'height';

export const BANNER_H = 350;
export const TOPNAVI_H = 50;
