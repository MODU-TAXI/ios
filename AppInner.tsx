import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/Landing';
import NaverMapScreen from './src/screens/NaverMap';
import PermissionScreen from './src/screens/Permission';
import usePermissions from './src/hooks/usePermissions';

const Stack = createNativeStackNavigator();

function AppInner() {
  //usePermissions();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LandingScreen"
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="NaverMapScreen" component={NaverMapScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
    </Stack.Navigator>
  );
}
export default AppInner;
