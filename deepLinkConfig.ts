// deeplinkConfig.js

import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '@type/param/rootStack';
import { LoginStackParamList } from '@type/param/loginStack';

export const deepLinks = {
  prefixes: ['modutaxi://'],
  config: {
    screens: {
      MainScreen: 'main',
      CreateRoomScreen: 'createRoom',
    },
  },
};

export const linking: LinkingOptions<LoginStackParamList> = {
  prefixes: ['modutaxi://'],
  config: {
    screens: {
      MainScreen: 'main',
      CreateRoomScreen: 'createRoom',
    },
  },
  async getInitialURL() {
    // 딥링크를 이용해서 앱이 오픈되었을 때
    // const initialNotification = await notifee.getInitialNotification();
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};
