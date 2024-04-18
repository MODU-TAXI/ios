import React from 'react';
import { RecoilRoot } from 'recoil'; // recoil
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ErrorHandler } from '@components/Fallback/CustomErrorFallback'; // 전역 에러 잡기 error-boundary
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react-query v5 라이브러리

import AppInner from './AppInner';

const queryClient = new QueryClient(); // react-query client

function App(): React.JSX.Element {
  return (
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
  );
}
export default App;
