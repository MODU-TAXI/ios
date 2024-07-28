import { Vibration } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

export const backgroundVibration = (): void => {
  Vibration.vibrate(PATTERN);
};

export const vibration = (): void => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};
