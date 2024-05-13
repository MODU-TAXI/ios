import axios from 'axios';
import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import Config from 'react-native-config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChatProvider } from 'src/providers/chatProvider';

import TestScreen from './src/screens/test';
import HomeScreen from './src/screens/home/Home';
import NaverMapScreen from './src/screens/NaverMap';
import PatchRoom from './src/screens/room/PatchRoom';
import MainMapScreen from './src/screens/map/MainMap';
import SearchScreen from './src/screens/search/Search';
import SignInScreen from './src/screens/SignIn/SignIn';
import ChatRoomScreen from './src/screens/chat/ChatRoom';
import CreateRoomScreen from './src/screens/room/CreateRoom';
import RoomDetailScreen from './src/screens/room/RoomDetail';
import SurveyFirstScreen from './src/screens/signUp/SurveyFirst';
import SurveySecondScreen from './src/screens/signUp/SurveySecond';
import AuthenticationScreen from './src/screens/signUp/Authentication';
import CompleteSignUpScreen from './src/screens/signUp/CompleteSignUp';
import CheckPermissionScreen from './src/screens/signUp/CheckPermission';
import SchoolAuthenticationScreen from './src/screens/signUp/SchoolAuthentication';
import EmailAuthenticationCodeScreen from './src/screens/signUp/EmailAuthenticationCode';
import PhoneAuthenticationCodeScreen from './src/screens/signUp/PhoneAuthenticationCode';

import { loggedInState } from '@recoil/recoil';

import { deleteToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

import { RootStackParamList } from '@type/param/rootStack';
import { LoginStackParamList } from '@type/param/loginStack';

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

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <LogInStack.Screen name="RoomDetailScreen" component={RoomDetailScreen} />
        <LogInStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
        <LogInStack.Screen name="PatchRoomScreen" component={PatchRoom} />
        <LogInStack.Screen name="SearchScreen" component={SearchScreen} />
        <LogInStack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
        <LogInStack.Screen name="TestScreen" component={TestScreen} />
      </LogInStack.Navigator>
    </ChatProvider>
  ) : (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="CheckPermissionScreen" component={CheckPermissionScreen} />
      <RootStack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
      <RootStack.Screen
        name="PhoneAuthenticationCodeScreen"
        component={PhoneAuthenticationCodeScreen}
      />
      <RootStack.Screen name="SchoolAuthenticationScreen" component={SchoolAuthenticationScreen} />
      <RootStack.Screen
        name="EmailAuthenticationCodeScreen"
        component={EmailAuthenticationCodeScreen}
      />
      <RootStack.Screen name="CompleteSignUpScreen" component={CompleteSignUpScreen} />
      <RootStack.Screen name="SurveyFirstScreen" component={SurveyFirstScreen} />
      <RootStack.Screen name="SurveySecondScreen" component={SurveySecondScreen} />
    </RootStack.Navigator>
  );
}
export default AppInner;
