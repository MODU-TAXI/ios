import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
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

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;
export type PermissionScreenProps = NativeStackScreenProps<RootStackParamList, 'PermissionScreen'>;
export type CheckPermissionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CheckPermissionScreen'
>;
export type AuthenticationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AuthenticationScreen'
>;
export type PhoneAuthenticationCodeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PhoneAuthenticationCodeScreen'
>;
export type SchoolAuthenticationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SchoolAuthenticationScreen'
>;
export type EmailAuthenticationCodeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EmailAuthenticationCodeScreen'
>;
export type CompleteSignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CompleteSignUpScreen'
>;
export type SurveyFirstScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SurveyFirstScreen'
>;
export type SurveySecondScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SurveySecondScreen'
>;
