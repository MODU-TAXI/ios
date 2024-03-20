import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NaverMapScreen from './src/screens/NaverMap';
import PermissionScreen from './src/screens/Permission';
import SignInScreen from './src/screens/signIn/SignIn';
import CheckPermissionScreen from './src/screens/signUp/CheckPermission';
import NicknameValidationScreen from './src/screens/signUp/NicknameValidation';
import SchoolAuthenticationScreen from './src/screens/signUp/SchoolAuthentication';
import AuthenticationCodeScreen from './src/screens/signUp/AuthenticationCode';
import CompleteSignUpScreen from './src/screens/signUp/CompleteSignUp';

import usePermissions from './src/hooks/usePermissions';
import { RootStackParamList } from './src/types/ParamLists';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  //usePermissions();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="NaverMapScreen" component={NaverMapScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
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
    </Stack.Navigator>
  );
}
export default AppInner;
