import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Spot } from '@type/entity/spot';
import { UserPreview } from '@type/entity/user';
import { SearchResultParams } from '@type/entity/search';
import { RoomDetail, RoomPreview } from '@type/entity/room';

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
  ChatRoomScreen: { roomId: number; managerId: number; readonly: boolean };
  AlarmScreen: undefined;

  // 생성
  CreateRoomScreen: undefined;
  DepartureMapScreen: undefined;
  DepartureSearchScreen: undefined;
  ArrivalMapScreen: undefined | { type: string; searchParams?: SearchResultParams; spot?: Spot };
  ArrivalSearchScreen: undefined;

  // 조회, 수정
  RoomDetailScreen: { roomId: number };
  PatchRoomScreen: { roomDetail: RoomDetail };
  MyPageScreen: undefined;

  // 정산
  CheckDepartureScreen: { roomPreview: RoomPreview };
  AmountScreen: { roomPreview: RoomPreview };
  AccountScreen: { roomPreview: RoomPreview };
  CheckAccountScreen: { roomPreview: RoomPreview };
  CheckCalculateScreen: { roomPreview: RoomPreview };
  CompleteCalculateScreen: { roomPreview: RoomPreview };
  CheckPaymentScreen: { roomPreview: RoomPreview };

  // 마이 페이지
  PatchNicknameScreen: undefined;
  PatchUserInfoScreen: undefined;
  PatchSchoolEmailScreen: undefined;
  PatchUserInfoAuthenticationScreen: undefined;
  PatchSchoolEmailAuthenticationScreen: undefined;
  HistoryScreen: undefined;
  HistoryDetailScreen: { historyId: number };
  ManageAccountScreen: undefined;
  ManageAlarmScreen: undefined;
  InquiryScreen: undefined;

  // 회원탈퇴
  WithdrawCheckScreen: undefined;
  WithdrawSurveyScreen: undefined;
  WithdrawLastScreen: undefined;
  WithdrawCompleteScreen: undefined;

  // 신고
  DeclarationScreen: { userInfo: UserPreview; roomId: number };

  // 테스트
  TestScreen: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<LoginStackParamList, 'HomeScreen'>;
export type MainMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'MainMapScreen'>;
export type NaverMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'NaverMapScreen'>;
export type SearchScreenProps = NativeStackScreenProps<LoginStackParamList, 'SearchScreen'>;
export type ChatRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'ChatRoomScreen'>;
export type AlarmScreenProps = NativeStackScreenProps<LoginStackParamList, 'AlarmScreen'>;
export type MyPageScreenProps = NativeStackScreenProps<LoginStackParamList, 'MyPageScreen'>;

// 생성 페이지들
export type CreateRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'CreateRoomScreen'>;
export type DepartureMapScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'DepartureMapScreen'
>;
export type DepartureSearchScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'DepartureSearchScreen'
>;
export type ArrivalMapScreenProps = NativeStackScreenProps<LoginStackParamList, 'ArrivalMapScreen'>;
export type ArrivalSearchScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'ArrivalSearchScreen'
>;

// 조회, 수정
export type RoomDetailScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomDetailScreen'>;
export type PatchRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'PatchRoomScreen'>;

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
export type CheckPaymentScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'CheckPaymentScreen'
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
export type PatchUserInfoAuthenticationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchUserInfoAuthenticationScreen'
>;
export type PatchSchoolEmailAuthenticationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'PatchSchoolEmailAuthenticationScreen'
>;
export type HistoryScreenProps = NativeStackScreenProps<LoginStackParamList, 'HistoryScreen'>;
export type HistoryDetailScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'HistoryDetailScreen'
>;
export type ManageAccountScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'ManageAccountScreen'
>;
export type ManageAlarmScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'ManageAlarmScreen'
>;
export type InquiryScreenProps = NativeStackScreenProps<LoginStackParamList, 'InquiryScreen'>;

// 회원탈퇴 페이지
export type WithdrawCheckScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'WithdrawCheckScreen'
>;
export type WithdrawSurveyScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'WithdrawSurveyScreen'
>;
export type WithdrawCompleteScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'WithdrawCompleteScreen'
>;
export type WithdrawLastScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'WithdrawLastScreen'
>;

// 신고 페이지
export type DeclarationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'DeclarationScreen'
>;

// 테스트 페이지
export type TestScreenProps = NativeStackScreenProps<LoginStackParamList, 'TestScreen'>;
