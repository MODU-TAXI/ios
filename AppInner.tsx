import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/Landing';
import NaverMapScreen from './src/screens/NaverMap';

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
      <Stack.Screen name="NaverMapScreen" component={NaverMapScreen} />
    </Stack.Navigator>
  );
}
export default AppInner;
