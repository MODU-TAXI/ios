import React from 'react';
import { View, Image } from 'react-native';

const TransparentLoadingComponent = () => {
  return (
    <View
      className="absolute z-20 flex h-screen w-screen items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <Image source={require('../../assets/images/Loading/Loading.gif')} className="h-20 w-20" />
    </View>
  );
};

export default TransparentLoadingComponent;
