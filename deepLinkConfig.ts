// deeplinkConfig.js

import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';

import { LoginStackParamList } from '@type/param/loginStack';

export const linking: LinkingOptions<LoginStackParamList> = {
  prefixes: ['modutaxi://'],
  config: {
    screens: {
      MainScreen: 'main',
      CreateRoomScreen: 'createRoom',
      RoomDetailScreen: 'room/:roomId',
      ChatRoomScreen: 'chatRoom/:roomId',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};
