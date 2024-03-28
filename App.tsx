import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppInner from './AppInner';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppInner />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
