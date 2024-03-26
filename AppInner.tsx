import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NaverMapScreen from './src/screens/NaverMap';
import SignInScreen from './src/screens/signIn/SignIn';
import CheckPermissionScreen from './src/screens/signUp/CheckPermission';
import AuthenticationScreen from './src/screens/signUp/Authentication';
import PhoneAuthenticationCodeScreen from './src/screens/signUp/PhoneAuthenticationCode';
import SchoolAuthenticationScreen from './src/screens/signUp/SchoolAuthentication';
import EmailAuthenticationCodeScreen from './src/screens/signUp/EmailAuthenticationCode';
import CompleteSignUpScreen from './src/screens/signUp/CompleteSignUp';
import SurveyFirstScreen from './src/screens/signUp/SurveyFirst';
import SurveySecondScreen from './src/screens/signUp/SurveySecond';

import { RootStackParamList } from './src/type/ParamLists';
import ExampleScreen from 'src/screens/map/Example';

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
        name="AuthenticationScreen"
        component={AuthenticationScreen}
      />
      <Stack.Screen
        name="PhoneAuthenticationCodeScreen"
        component={PhoneAuthenticationCodeScreen}
      />
      <Stack.Screen
        name="SchoolAuthenticationScreen"
        component={SchoolAuthenticationScreen}
      />
      <Stack.Screen
        name="EmailAuthenticationCodeScreen"
        component={EmailAuthenticationCodeScreen}
      />
      <Stack.Screen
        name="CompleteSignUpScreen"
        component={CompleteSignUpScreen}
      />
      <Stack.Screen name="SurveyFirstScreen" component={SurveyFirstScreen} />
      <Stack.Screen name="SurveySecondScreen" component={SurveySecondScreen} />
      <Stack.Screen name="ExampleScreen" component={ExampleScreen} />
    </Stack.Navigator>
  );
}
export default AppInner;
