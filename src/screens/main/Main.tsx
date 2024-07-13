import DeviceInfo from 'react-native-device-info';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from 'src/screens/home/Home';
import MyPageScreen from 'src/screens/my/MyPage';
import MainMapScreen from 'src/screens/map/MainMap';

import MapTabComponent from '@components/BottomTab/MapTab';
import HomeTabComponent from '@components/BottomTab/HomeTab';
import MyPageTabComponent from '@components/BottomTab/MyPageTab';

import { useIsOldiPhone } from '@hooks/device';

import { TabNavigatorParamList } from '@type/param/loginStack';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const MainScreen = () => {
  const isOldiPhone = useIsOldiPhone();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: isOldiPhone
          ? {
              backgroundColor: 'white',
              opacity: 0.95,
              paddingTop: 12,
              paddingBottom: 12,
              borderTopWidth: 0,
              position: 'absolute',
            }
          : {
              backgroundColor: 'white',
              opacity: 0.95,
              paddingTop: 12,
              borderRadius: 24,
              borderTopWidth: 0,
              position: 'absolute',
            },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <HomeTabComponent focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="MainMapScreen"
        component={MainMapScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MapTabComponent focused={focused} />;
          },
        })}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={({ route }) => ({
          // title 없애고 custom 하기 위한 옵션
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused }) => {
            return <MyPageTabComponent focused={focused} />;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
