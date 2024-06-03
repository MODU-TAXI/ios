import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RoomDetail, RoomPreview } from '@type/entity/room';
import { DepartureSearchParams } from '@type/entity/search';

export type TabNavigatorParamList = {
  HomeScreen: undefined;
  MainMapScreen: undefined;
  MyPageScreen: undefined;
};

export type LoginStackParamList = {
  MainScreen: undefined;
  HomeScreen: undefined;
  MainMapScreen: undefined;
  NaverMapScreen: undefined;
  SearchScreen: undefined;
  DepartureMapScreen: undefined | { searchParams: DepartureSearchParams };
  ArrivalMapScreen: undefined;
  CreateRoomScreen: undefined;
  RoomDetailScreen: { roomId: number };
  PatchRoomScreen: { roomDetail: RoomDetail };
  ChatRoomScreen: { roomId: number };
  AlarmScreen: undefined;

  // 정산
  CheckDepartureScreen: { roomPreview: RoomPreview };
  AmountScreen: undefined;
  AccountScreen: undefined;
  CheckAccountScreen: undefined;

  // 테스트
  TestScreen: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<LoginStackParamList, 'HomeScreen'>;
export type MainMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'MainMapScreen'>;
export type NaverMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'NaverMapScreen'>;
export type SearchScreenProps = NativeStackScreenProps<LoginStackParamList, 'SearchScreen'>;
export type DepartureMapScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'DepartureMapScreen'
>;
export type ArrivalMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'ArrivalMapScreen'>;
export type CreateRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'CreateRoomScreen'>;
export type RoomDetailScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomDetailScreen'>;
export type PatchRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'PatchRoomScreen'>;
export type ChatRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'ChatRoomScreen'>;
export type AlarmScreenProps = NativeStackScreenProps<LoginStackParamList, 'AlarmScreen'>;

// 정산페이지들
export type CheckDepartureScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'CheckDepartureScreen'
>;
export type AmountScreenProps = NativeStackScreenProps<LoginStackParamList, 'AmountScreen'>;
export type AccountScreenProps = NativeStackScreenProps<LoginStackParamList, 'AccountScreen'>;
export type CheckAccountScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'CheckAccountScreen'
>;

// 테스트 페이지
export type TestScreenProps = NativeStackScreenProps<LoginStackParamList, 'TestScreen'>;
