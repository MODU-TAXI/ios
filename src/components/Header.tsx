import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '@assets/images/Header/BackButton.svg';

interface HeaderComponentProps {
  title: string;
  resetRecoilValue?: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, resetRecoilValue }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
    if (resetRecoilValue) {
      resetRecoilValue();
    }
  };

  return (
    <View className="flex-row items-center justify-between bg-white px-4">
      <Pressable onPress={goBack}>
        <BackButton />
      </Pressable>

      <Text className="text-lg font-semibold text-black">{title}</Text>

      <View className="h-10 w-10 bg-white" />
    </View>
  );
};

export default HeaderComponent;
