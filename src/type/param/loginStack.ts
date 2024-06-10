import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserPreview } from '@type/entity/user';
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
  MyPageScreen: undefined;

  // 정산
  CheckDepartureScreen: { roomPreview: RoomPreview };
  AmountScreen: undefined;
  AccountScreen: undefined;
  CheckAccountScreen: undefined;
  CheckCalculateScreen: undefined;
  CompleteCalculateScreen: undefined;

  // 마이 페이지
  PatchNicknameScreen: undefined;
  PatchUserInfoScreen: undefined;
  PatchSchoolEmailScreen: undefined;
  PatchAccountScreen: undefined;
  PatchUserInfoAuthenticationScreen: undefined;
  PatchSchoolEmailAuthenticationScreen: undefined;

  // 신고
  DeclarationScreen: { userInfo: UserPreview; roomId: number };

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
export type MyPageScreenProps = NativeStackScreenProps<LoginStackParamList, 'MyPageScreen'>;
export type AlarmScreenProps = NativeStackScreenProps<LoginStackParamList, 'AlarmScreen'>;

// 정산 페이지들
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
export type CheckCalculateScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'CheckCalculateScreen'
>;
export type CompleteCalculateScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'CompleteCalculateScreen'
>;

// 마이 페이지
export type PatchNicknameScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchNicknameScreen'
>;
export type PatchUserInfoScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchUserInfoScreen'
>;
export type PatchSchoolEmailScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchSchoolEmailScreen'
>;
export type PatchAccountScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchAccountScreen'
>;
export type PatchUserInfoAuthenticationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchUserInfoAuthenticationScreen'
>;
export type PatchSchoolEmailAuthenticationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchSchoolEmailAuthenticationScreen'
>;

// 신고 페이지
export type DeclarationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'DeclarationScreen'
>;

// 테스트 페이지
export type TestScreenProps = NativeStackScreenProps<LoginStackParamList, 'TestScreen'>;
