import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RoomDetail } from '@type/entity/room';

export type LoginStackParamList = {
  HomeScreen: undefined;
  MainMapScreen: undefined;
  NaverMapScreen: undefined;
  SearchScreen: undefined;
  CreateRoomScreen: undefined;
  RoomDetailScreen: { roomId: number };
  PatchRoomScreen: { roomDetail: RoomDetail };
  ChatRoomScreen: { roomId: number };
  TestScreen: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<LoginStackParamList, 'HomeScreen'>;
export type MainMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'MainMapScreen'>;
export type NaverMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'NaverMapScreen'>;
export type SearchScreenProps = NativeStackScreenProps<LoginStackParamList, 'SearchScreen'>;
export type CreateRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'CreateRoomScreen'>;
export type RoomDetailScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomDetailScreen'>;
export type PatchRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'PatchRoomScreen'>;
export type ChatRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'ChatRoomScreen'>;
export type TestScreenProps = NativeStackScreenProps<LoginStackParamList, 'TestScreen'>;
