import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/Landing';

const Stack = createNativeStackNavigator();

function AppInner() {
  return (
    <Stack.Navigator initialRouteName="LandingScreen">
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
    </Stack.Navigator>
  );
}
export default AppInner;
