import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NaverMapScreen from './src/screens/NaverMap';
import PermissionScreen from './src/screens/Permission';
import SignInScreen from './src/screens/signIn/SignIn';
import AuthenticationScreen from './src/screens/signUp/Authentication';
import usePermissions from './src/hooks/usePermissions';
import { RootStackParamList } from './src/types/ParamLists';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  //usePermissions();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="NaverMapScreen" component={NaverMapScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      <Stack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}
      />
    </Stack.Navigator>
  );
}
export default AppInner;
