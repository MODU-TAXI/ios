import React from 'react';
import { View, Text } from 'react-native';

import Logo from '@assets/images/Home/Logo.svg';
import Bell from '@assets/images/Home/Bell.svg';

const TopComponent = () => {
  return (
    <View className="flex-row items-center justify-between bg-main">
      <View>
        <Logo />
      </View>

      <View>
        <Bell />
      </View>
    </View>
  );
};

export default TopComponent;
