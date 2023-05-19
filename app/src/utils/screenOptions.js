import { TransitionPresets } from '@react-navigation/stack';
import { isIOS } from 'helpers/constants/environment';

export const stackScreenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

export const noHeader = {
  headerShown: false,
};

export const noGestures = {
  gestureEnabled: false,
};

export const modalScreenOptions = {
  cardOverlayEnabled: true,
  gestureEnabled: true,
  headerShown: false,
  presentation: 'modal',
  ...(isIOS
    ? { ...TransitionPresets.ModalPresentationIOS }
    : {
        ...TransitionPresets.DefaultTransition,
        cardOverlayEnabled: false,
      }),
};
