import React from 'react';
import { View, Text, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const LoadingComponent = () => {
  return (
    <View className="absolute z-20 flex h-full w-full items-center justify-center ">
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        blurAmount={3}
        blurType="light"
      />
      <Image
        source={require('../../assets/images/Loading/LoadingCircle.gif')}
        className="h-20 w-20"
      />
      <Text className="text-[16px] font-semibold text-main">로딩중...</Text>
    </View>
  );
};

export default LoadingComponent;
