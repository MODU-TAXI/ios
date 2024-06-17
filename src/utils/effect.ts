import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const vibration = (): void => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};
