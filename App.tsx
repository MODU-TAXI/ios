import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorBoundary from 'react-native-error-boundary'; // 전역 에러 처리 라이브러리
import CustomErrorFallback from '@components/Fallback/CustomErrorFallback'; // 에러시 보여줄 화면 component
import AppInner from './AppInner';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <NavigationContainer>
            <ErrorBoundary FallbackComponent={CustomErrorFallback}>
              <AppInner />
            </ErrorBoundary>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
export default App;
