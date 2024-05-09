import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '@assets/images/Header/BackButton.svg';
import CloseButton from '@assets/images/Header/CloseButton.svg';

interface HeaderComponentProps {
  title: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-row items-center justify-between px-4">
      <Pressable onPress={goBack}>
        <BackButton />
      </Pressable>

      <Text className="text-lg text-black font-semibold">{title}</Text>

      <Pressable onPress={goBack}>
        <CloseButton />
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
