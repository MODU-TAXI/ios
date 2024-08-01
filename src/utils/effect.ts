import { Vibration } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

export const fcmVibration = (): void => {
  Vibration.vibrate(PATTERN);
};

// refresh시 진동
export const refreshVibration = (): void => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

// keyboard 입력시 진동
export const keyboardTouchVibration = (): void => {
  // ReactNativeHapticFeedback.trigger('impactMedium', {
  //   enableVibrateFallback: true,
  //   ignoreAndroidSystemSettings: false,
  // });
};
