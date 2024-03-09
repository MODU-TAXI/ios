import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import AppInner from './AppInner';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <AppInner />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
