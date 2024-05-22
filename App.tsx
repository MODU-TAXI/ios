import React, { Suspense } from 'react';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppInner from './AppInner'; // 400 Error 및 성공 toast message 띄워주기 라이버르리

import { CustomErrorHandler } from '@components/Fallback/CustomErrorFallback'; // 전역 에러 잡기 error-boundary 라이브러리
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native'; // 줄여쓰면 에러발생 줄이지 말것
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react-query v5 라이브러리
import { RecoilRoot } from 'recoil'; // recoil 라이브러리

import messaging from '@react-native-firebase/messaging';

import LoadingComponent from '@components/Common/Loading';

import { onMessageReceivedBackground } from '@utils/fcm';

Sentry.init({
  dsn: Config.SENTRY_DSN,
});

const queryClient = new QueryClient(); // react-query client

// Background에서 FCM Message 수신
messaging().setBackgroundMessageHandler(onMessageReceivedBackground);

import { linking } from './deepLinkConfig';

function App(): React.JSX.Element {
  return (
    <>
      <RecoilRoot>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <NavigationContainer linking={linking} fallback={<LoadingComponent />}>
              <CustomErrorHandler>
                <Suspense fallback={<LoadingComponent />}>
                  <QueryClientProvider client={queryClient}>
                    <AppInner />
                  </QueryClientProvider>
                </Suspense>
              </CustomErrorHandler>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </RecoilRoot>
      <Toast />
    </>
  );
}

export default App;
