import { useRecoilState } from 'recoil';
import LottieView from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';
import React, { useRef, useState, useEffect } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InquiryScreen from 'src/screens/my/Inquiry';
import ManageAlarmScreen from 'src/screens/my/ManageAlarm';
import ManageAccountScreen from 'src/screens/my/ManageAccount';
import WithdrawLastScreen from 'src/screens/withdraw/WithdrawLast';
import WithdrawCheckScreen from 'src/screens/withdraw/WithdrawCheck';
import WithdrawSurveyScreen from 'src/screens/withdraw/WithdrawSurvey';
import WithdrawCompleteScreen from 'src/screens/withdraw/WithdrawComplete';

import TestScreen from './src/screens/test';
import MainScreen from './src/screens/main/Main';
import HomeScreen from './src/screens/home/Home';
import MyPageScreen from './src/screens/my/MyPage';
import AlarmScreen from './src/screens/alarm/alarm';
import NaverMapScreen from './src/screens/NaverMap';
import MainMapScreen from './src/screens/map/MainMap';
import SignInScreen from './src/screens/signIn/SignIn';
import ChatRoomScreen from './src/screens/chat/ChatRoom';
import HistoryScreen from './src/screens/history/History';
import AmountScreen from './src/screens/calculate/Amount';
import PatchRoomScreen from './src/screens/room/PatchRoom';
import ArrivalMapScreen from './src/screens/map/ArrivalMap';
import AccountScreen from './src/screens/calculate/Account';
import CreateRoomScreen from './src/screens/room/CreateRoom';
import RoomDetailScreen from './src/screens/room/RoomDetail';
import SearchScreen from './src/screens/search/MainMapSearch';
import HomeSearchScreen from './src/screens/search/HomeSearch';
import DepartureMapScreen from './src/screens/map/DepartureMap';
import SurveyFirstScreen from './src/screens/signUp/SurveyFirst';
import PatchNicknameScreen from './src/screens/my/PatchNickname';
import PatchUserInfoScreen from './src/screens/my/PatchUserInfo';
import SurveySecondScreen from './src/screens/signUp/SurveySecond';
import ArrivalSearchScreen from './src/screens/search/ArrivalSearch';
import CheckPaymentScreen from './src/screens/calculate/CheckPayment';
import HistoryDetailScreen from './src/screens/history/HistoryDetail';
import CheckAccountScreen from './src/screens/calculate/CheckAccount';
import DeclarationScreen from './src/screens/declaration/Declaration';
import AuthenticationScreen from './src/screens/signUp/Authentication';
import CompleteSignUpScreen from './src/screens/signUp/CompleteSignUp';
import PatchSchoolEmailScreen from './src/screens/my/PatchSchoolEmail';
import DepartureSearchScreen from './src/screens/search/DepartureSearch';
import CheckPermissionScreen from './src/screens/signUp/CheckPermission';
import CheckCalculateScreen from './src/screens/calculate/CheckCalculate';
import CheckDepartureScreen from './src/screens/calculate/CheckDeparture';
import RegisterNicknameScreen from './src/screens/signUp/RegisterNickname';
import CompleteCalculateScreen from './src/screens/calculate/CompeleteCalculate';
import SchoolAuthenticationScreen from './src/screens/signUp/SchoolAuthentication';
import EmailAuthenticationCodeScreen from './src/screens/signUp/EmailAuthenticationCode';
import PhoneAuthenticationCodeScreen from './src/screens/signUp/PhoneAuthenticationCode';
import PatchUserInfoAuthenticationScreen from './src/screens/my/PatchUserInfoAuthentication';
import PatchSchoolEmailAuthenticationScreen from './src/screens/my/PatchSchoolEmailAuthentication';

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
  const [appLoaded, setAppLoaded] = useState<boolean>(false);

  useCheckLogin(setLoggedIn, setAppLoaded); // refresh api로 로그인 되어있는지 여부 체크후, 로그인 여부 갱신
  useFcmMessage(); // Foreground에서 FCM Message 수신
  useNotifee(); // notifeecation제어

  if (!appLoaded)
    return (
      <Animated.View
        exiting={FadeOut.duration(300)}
        style={{
          flex: 1,
        }}
      >
        <LottieView
          source={require('./src/assets/SplashScreen.json')}
          style={{ flex: 1, backgroundColor: 'white' }}
          autoPlay={true}
          loop={false}
        />
      </Animated.View>
    );

  return (
    <GestureHandlerRootView>
      {loggedIn ? (
        <Animated.View style={{ flex: 1, backgroundColor: 'white' }} entering={FadeIn}>
          <LogInStack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <LogInStack.Screen name="MainScreen" component={MainScreen} />
            <LogInStack.Screen name="HomeScreen" component={HomeScreen} />
            <LogInStack.Screen name="MyPageScreen" component={MyPageScreen} />
            <LogInStack.Screen name="NaverMapScreen" component={NaverMapScreen} />
            <LogInStack.Screen name="MainMapScreen" component={MainMapScreen} />
            <LogInStack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
            <LogInStack.Screen name="AlarmScreen" component={AlarmScreen} />
            <LogInStack.Screen name="HomeSearchScreen" component={HomeSearchScreen} />

            {/* 생성 Screen */}
            <LogInStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
            <LogInStack.Screen name="DepartureMapScreen" component={DepartureMapScreen} />
            <LogInStack.Screen name="DepartureSearchScreen" component={DepartureSearchScreen} />
            <LogInStack.Screen name="ArrivalMapScreen" component={ArrivalMapScreen} />
            <LogInStack.Screen name="ArrivalSearchScreen" component={ArrivalSearchScreen} />
            <LogInStack.Screen name="SearchScreen" component={SearchScreen} />

            {/* 조회, 수정 Screen */}
            <LogInStack.Screen name="RoomDetailScreen" component={RoomDetailScreen} />
            <LogInStack.Screen name="PatchRoomScreen" component={PatchRoomScreen} />

            {/* 정산 Screen */}
            <LogInStack.Screen name="CheckDepartureScreen" component={CheckDepartureScreen} />
            <LogInStack.Screen name="AmountScreen" component={AmountScreen} />
            <LogInStack.Screen name="AccountScreen" component={AccountScreen} />
            <LogInStack.Screen name="CheckAccountScreen" component={CheckAccountScreen} />
            <LogInStack.Screen name="CheckCalculateScreen" component={CheckCalculateScreen} />
            <LogInStack.Screen name="CompleteCalculateScreen" component={CompleteCalculateScreen} />
            <LogInStack.Screen name="CheckPaymentScreen" component={CheckPaymentScreen} />

            {/* 마이페이지 Screen */}
            <LogInStack.Screen name="PatchNicknameScreen" component={PatchNicknameScreen} />
            <LogInStack.Screen name="PatchUserInfoScreen" component={PatchUserInfoScreen} />
            <LogInStack.Screen name="PatchSchoolEmailScreen" component={PatchSchoolEmailScreen} />
            <LogInStack.Screen
              name="PatchUserInfoAuthenticationScreen"
              component={PatchUserInfoAuthenticationScreen}
            />
            <LogInStack.Screen
              name="PatchSchoolEmailAuthenticationScreen"
              component={PatchSchoolEmailAuthenticationScreen}
            />
            <LogInStack.Screen name="HistoryScreen" component={HistoryScreen} />
            <LogInStack.Screen name="HistoryDetailScreen" component={HistoryDetailScreen} />
            <LogInStack.Screen name="ManageAccountScreen" component={ManageAccountScreen} />
            <LogInStack.Screen name="ManageAlarmScreen" component={ManageAlarmScreen} />
            <LogInStack.Screen name="InquiryScreen" component={InquiryScreen} />

            {/* 회원탈퇴 Screen */}
            <LogInStack.Screen name="WithdrawCheckScreen" component={WithdrawCheckScreen} />
            <LogInStack.Screen name="WithdrawSurveyScreen" component={WithdrawSurveyScreen} />
            <LogInStack.Screen name="WithdrawCompleteScreen" component={WithdrawCompleteScreen} />
            <LogInStack.Screen name="WithdrawLastScreen" component={WithdrawLastScreen} />

            {/* 신고 Screen */}
            <LogInStack.Screen name="DeclarationScreen" component={DeclarationScreen} />

            <LogInStack.Screen name="TestScreen" component={TestScreen} />
          </LogInStack.Navigator>
        </Animated.View>
      ) : (
        <Animated.View style={{ flex: 1, backgroundColor: 'white' }} entering={FadeIn}>
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
            <RootStack.Screen
              name="SchoolAuthenticationScreen"
              component={SchoolAuthenticationScreen}
            />
            <RootStack.Screen
              name="EmailAuthenticationCodeScreen"
              component={EmailAuthenticationCodeScreen}
            />
            <RootStack.Screen name="CompleteSignUpScreen" component={CompleteSignUpScreen} />
            <RootStack.Screen name="SurveyFirstScreen" component={SurveyFirstScreen} />
            <RootStack.Screen name="SurveySecondScreen" component={SurveySecondScreen} />
          </RootStack.Navigator>
        </Animated.View>
      )}
    </GestureHandlerRootView>
  );
}
export default AppInner;
