import React from 'react';
import { View, Text, Pressable } from 'react-native';
import BackButton from '@assets/images/Header/BackButton.svg';
import CloseButton from '@assets/images/Header/CloseButton.svg';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent: React.FC = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-row items-center justify-between">
      <Pressable onPress={goBack}>
        <BackButton />
      </Pressable>

      <Text className="text-lg text-black font-semibold">매칭 페이지</Text>

      <Pressable onPress={goBack}>
        <CloseButton />
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
