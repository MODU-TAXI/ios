import React from 'react';
import { View, Text, Image } from 'react-native';

const ImageUploadtLoadingComponent = () => {
  return (
    <View
      className="absolute z-20 flex h-screen w-screen items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <Image source={require('../../assets/images/Loading/Loading.gif')} className="h-20 w-20" />

      <Text className="bottom-4 text-[14px] font-semibold text-white">이미지 업로드 중...</Text>
    </View>
  );
};

export default ImageUploadtLoadingComponent;
