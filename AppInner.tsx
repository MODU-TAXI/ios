import React from 'react';
import { useRecoilState } from 'recoil';
import messaging from '@react-native-firebase/messaging';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from 'src/screens/main/Main';
import AlarmScreen from 'src/screens/alarm/alarm';
import { ChatProvider } from 'src/providers/chatProvider';
import RegisterNicknameScreen from 'src/screens/signUp/RegisterNickname';

import TestScreen from './src/screens/test';
import HomeScreen from './src/screens/home/Home';
import NaverMapScreen from './src/screens/NaverMap';
import PatchRoom from './src/screens/room/PatchRoom';
import MainMapScreen from './src/screens/map/MainMap';
import SearchScreen from './src/screens/search/Search';
import SignInScreen from './src/screens/signIn/SignIn';
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

import { useFcmMessage } from '@hooks/fcm';
import { useNotifee } from '@hooks/notifee';
import { useCheckLogin } from '@hooks/login';

import { onMessageReceivedBackground } from '@utils/fcm';

import { RootStackParamList } from '@type/param/rootStack';
import { LoginStackParamList } from '@type/param/loginStack';
// Background에서 FCM Message 수신
messaging().setBackgroundMessageHandler(onMessageReceivedBackground);

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LogInStack = createNativeStackNavigator<LoginStackParamList>();

function AppInner() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  useCheckLogin(setLoggedIn); // refresh api로 로그인 되어있는지 여부 체크후, 로그인 여부 갱신
  useFcmMessage(); // Foreground에서 FCM Message 수신
  useNotifee(); // notifeecation제어

  return loggedIn ? (
    <ChatProvider>
      <LogInStack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <LogInStack.Screen name="MainScreen" component={MainScreen} />
        <LogInStack.Screen name="HomeScreen" component={HomeScreen} />
        <LogInStack.Screen name="NaverMapScreen" component={NaverMapScreen} />
        <LogInStack.Screen name="MainMapScreen" component={MainMapScreen} />
        <LogInStack.Screen name="RoomDetailScreen" component={RoomDetailScreen} />
        <LogInStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
        <LogInStack.Screen name="PatchRoomScreen" component={PatchRoom} />
        <LogInStack.Screen name="SearchScreen" component={SearchScreen} />
        <LogInStack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
        <LogInStack.Screen name="AlarmScreen" component={AlarmScreen} />
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
      <RootStack.Screen name="RegisterNicknameScreen" component={RegisterNicknameScreen} />
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
