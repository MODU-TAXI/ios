import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NaverMapScreen from './src/screens/NaverMap';
import SignInScreen from './src/screens/signIn/SignIn';
import CheckPermissionScreen from './src/screens/signUp/CheckPermission';
import NicknameValidationScreen from './src/screens/signUp/NicknameValidation';
import SchoolAuthenticationScreen from './src/screens/signUp/SchoolAuthentication';
import AuthenticationCodeScreen from './src/screens/signUp/AuthenticationCode';
import CompleteSignUpScreen from './src/screens/signUp/CompleteSignUp';
import SurveyFirstScreen from './src/screens/signUp/SurveyFirst';
import SurveySecondScreen from './src/screens/signUp/SurveySecond';

import { RootStackParamList } from './src/type/ParamLists';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="NaverMapScreen" component={NaverMapScreen} />
      <Stack.Screen
        name="CheckPermissionScreen"
        component={CheckPermissionScreen}
      />
      <Stack.Screen
        name="NicknameValidationScreen"
        component={NicknameValidationScreen}
      />
      <Stack.Screen
        name="SchoolAuthenticationScreen"
        component={SchoolAuthenticationScreen}
      />
      <Stack.Screen
        name="AuthenticationCodeScreen"
        component={AuthenticationCodeScreen}
      />
      <Stack.Screen
        name="CompleteSignUpScreen"
        component={CompleteSignUpScreen}
      />
      <Stack.Screen name="SurveyFirstScreen" component={SurveyFirstScreen} />
      <Stack.Screen name="SurveySecondScreen" component={SurveySecondScreen} />
    </Stack.Navigator>
  );
}
export default AppInner;
