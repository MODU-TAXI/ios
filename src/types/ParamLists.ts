import { RoomDetail } from './entity/room';

type RootStackParamList = {
  SignInScreen: undefined;
  PermissionScreen: undefined;
  CheckPermissionScreen: undefined;
  AuthenticationScreen: undefined;
  PhoneAuthenticationCodeScreen: undefined;
  SchoolAuthenticationScreen: undefined;
  EmailAuthenticationCodeScreen: undefined;
  CompleteSignUpScreen: undefined;
  SurveyFirstScreen: undefined;
  SurveySecondScreen: undefined;
};

type LoginStackParamList = {
  HomeScreen: undefined;
  RoomDetailScreen: undefined;
  MainMapScreen: undefined;
  NaverMapScreen: undefined;
  CreateRoomScreen: undefined;
  PatchRoomScreen: { roomDetail: RoomDetail };
  SearchScreen: undefined;
  ChatRoomScreen: undefined;
  TestScreen: undefined;
};

export type { RootStackParamList, LoginStackParamList };
