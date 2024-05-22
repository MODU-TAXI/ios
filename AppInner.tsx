import { useRecoilValue } from 'recoil';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChatProvider } from 'src/providers/chatProvider';

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

import { RootStackParamList } from '@type/param/rootStack';
import { LoginStackParamList, TabNavigatorParamList } from '@type/param/loginStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LogInStack = createNativeStackNavigator<LoginStackParamList>();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyPageScreen from 'src/screens/my/MyPage';

import MapTabComponent from '@components/BottomTab/MapTab';
import HomeTabComponent from '@components/BottomTab/HomeTab';
import MyPageTabComponent from '@components/BottomTab/MyPageTab';

import { useFcmMessage } from '@hooks/fcm';
import { useCheckLogin } from '@hooks/login';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          opacity: 0.95,
          paddingTop: 12,
          borderRadius: 24,
          borderTopWidth: 0,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <HomeTabComponent focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="MainMapScreen"
        component={MainMapScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MapTabComponent focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MyPageTabComponent focused={focused} />;
          },
        })}
      />
    </Tab.Navigator>
  );
}
import { useNavigation } from '@react-navigation/native';
import notifee, { EventType } from '@notifee/react-native';

function AppInner() {
  const loggedIn = useRecoilValue(loggedInState);

  useCheckLogin(); // refresh api로 로그인 되어있는지 여부 체크후, 로그인 여부 갱신
  useFcmMessage(); // Foreground에서 FCM Message 수신

  useEffect(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log(detail);
      if (type === EventType.PRESS) {
        // 처리할 이벤트 추가
        console.log('touch!');
        navigation.navigate('MainScreen');
      } else if (type === EventType.DISMISSED) {
        console.log('dismiss');
        // noti 삭제
        if (detail?.notification?.id) {
          notifee.cancelNotification(detail.notification.id);
          notifee.cancelDisplayedNotification(detail.notification.id);
        }
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log('App.js notifee onBackgroundEvent==============');
      if (type === EventType.PRESS) {
        // 처리할 이벤트 추가
      } else if (type === EventType.DISMISSED) {
        // noti 삭제
        // notifee.cancelNotification(detail.notification.id);
        // notifee.cancelDisplayedNotification(detail.notification.id);
      }
    });
  });

  return loggedIn ? (
    <ChatProvider>
      <LogInStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <LogInStack.Screen name="MainScreen" component={TabNavigator} />
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
