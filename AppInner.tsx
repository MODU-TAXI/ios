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
import HomeScreen from './src/screens/home/Home';
import MatchScreen from './src/screens/match/Match';
import MainMapScreen from './src/screens/map/MainMap';
import { LoginStackParamList, RootStackParamList } from './src/type/ParamLists';

import { useRecoilValue } from 'recoil';
import { loggedInState } from '@recoil/recoil';
import CreateMatchScreen from 'src/screens/match/CreateMatch';
import SearchScreen from 'src/screens/search/Search';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LogInStack = createNativeStackNavigator<LoginStackParamList>();

function AppInner() {
  const isLoggedIn = useRecoilValue(loggedInState);

  return isLoggedIn ? (
    <LogInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LogInStack.Screen name="HomeScreen" component={HomeScreen} />
      <LogInStack.Screen name="MainMapScreen" component={MainMapScreen} />
      <LogInStack.Screen name="MatchScreen" component={MatchScreen} />
      <LogInStack.Screen
        name="CreateMatchScreen"
        component={CreateMatchScreen}
      />
      <LogInStack.Screen name="SearchScreen" component={SearchScreen} />
    </LogInStack.Navigator>
  ) : (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="NaverMapScreen" component={NaverMapScreen} />
      <RootStack.Screen
        name="CheckPermissionScreen"
        component={CheckPermissionScreen}
      />
      <RootStack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
      />
      <RootStack.Screen
        name="PhoneAuthenticationCodeScreen"
        component={PhoneAuthenticationCodeScreen}
      />
      <RootStack.Screen
        name="SchoolAuthenticationScreen"
        component={SchoolAuthenticationScreen}
      />
      <RootStack.Screen
        name="EmailAuthenticationCodeScreen"
        component={EmailAuthenticationCodeScreen}
      />
      <RootStack.Screen
        name="CompleteSignUpScreen"
        component={CompleteSignUpScreen}
      />
      <RootStack.Screen
        name="SurveyFirstScreen"
        component={SurveyFirstScreen}
      />
      <RootStack.Screen
        name="SurveySecondScreen"
        component={SurveySecondScreen}
      />
    </RootStack.Navigator>
  );
}
export default AppInner;
