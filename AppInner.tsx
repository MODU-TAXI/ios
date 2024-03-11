import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/Landing';
import KakaoMapScreen from './src/screens/KakaoMap';

const Stack = createNativeStackNavigator();

function AppInner() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LandingScreen"
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="KakaoMapScreen" component={KakaoMapScreen} />
    </Stack.Navigator>
  );
}
export default AppInner;
