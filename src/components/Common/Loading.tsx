import React from 'react';
import { View, Image } from 'react-native';

const LoadingComponent = () => {
  return (
    <View className="absolute z-20 flex h-full w-full items-center justify-center bg-white ">
      <Image source={require('../../assets/images/Loading/Loading.gif')} className="h-20 w-20" />
    </View>
  );
};

export default LoadingComponent;
