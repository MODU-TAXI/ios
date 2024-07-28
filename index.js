/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';

import { backgroundVibration } from '@utils/effect';
import { onMessageReceivedBackground } from '@utils/fcm';

// Background에서 FCM Message 수신
messaging().setBackgroundMessageHandler((message) => {
  backgroundVibration();

  onMessageReceivedBackground(message);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
