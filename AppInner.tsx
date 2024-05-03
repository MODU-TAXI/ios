import React, { useEffect } from 'react';
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

import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loggedInState } from '@recoil/recoil';
import CreateMatchScreen from 'src/screens/match/CreateMatch';
import SearchScreen from 'src/screens/search/Search';
import ChatRoomScreen from 'src/screens/chat/ChatRoom';
import { ChatProvider } from 'src/providers/chatProvider';
import {
  deleteToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@utils/token';
import Config from 'react-native-config';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LogInStack = createNativeStackNavigator<LoginStackParamList>();

function AppInner() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  // refresh api로 로그인 되어있는지 여부 체크후, 로그인 여부 갱신
  const checkLogin = async () => {
    try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        setLoggedIn(false);
        await deleteToken();
      }

      const response = await axios.patch(
        `${Config.SERVER_URL}api/members/refresh`,
        {},
        { headers: { refreshToken: refreshToken } },
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      setLoggedIn(true);

      await setAccessToken(newAccessToken);
      await setRefreshToken(newRefreshToken);
    } catch (error) {
      setLoggedIn(false);
      await deleteToken();
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return loggedIn ? (
    <ChatProvider>
      <LogInStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <LogInStack.Screen name="HomeScreen" component={HomeScreen} />
        <LogInStack.Screen name="NaverMapScreen" component={NaverMapScreen} />
        <LogInStack.Screen name="MainMapScreen" component={MainMapScreen} />
        <LogInStack.Screen name="MatchScreen" component={MatchScreen} />
        <LogInStack.Screen
          name="CreateMatchScreen"
          component={CreateMatchScreen}
        />
        <LogInStack.Screen name="SearchScreen" component={SearchScreen} />
        <LogInStack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
      </LogInStack.Navigator>
    </ChatProvider>
  ) : (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
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
