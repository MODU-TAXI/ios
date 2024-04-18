import React from 'react';
import { RecoilRoot } from 'recoil'; // recoil 라이브러리
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ErrorHandler } from '@components/Fallback/CustomErrorFallback'; // 전역 에러 잡기 error-boundary 라이브러리
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react-query v5 라이브러리
import Toast from 'react-native-toast-message'; // 400 Error 및 성공 toast message 띄워주기 라이버르리
import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native'; // 줄여쓰면 에러발생 줄이지 말것

import AppInner from './AppInner';

Sentry.init({
  dsn: Config.SETNRY_DSN,
});

const queryClient = new QueryClient(); // react-query client

function App(): React.JSX.Element {
  return (
    <>
      <RecoilRoot>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <NavigationContainer>
              <QueryClientProvider client={queryClient}>
                <ErrorHandler>
                  <AppInner />
                </ErrorHandler>
              </QueryClientProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </RecoilRoot>
      <Toast />
    </>
  );
}
export default App;
