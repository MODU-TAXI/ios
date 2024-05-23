import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '@assets/images/Header/BackButton.svg';
import CloseButton from '@assets/images/Header/CloseButton.svg';

interface HeaderComponentProps {
  title: string;
  clearMessages?: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, clearMessages }) => {
  const navigation = useNavigation();

  const goBack = () => {
    if (clearMessages) {
      clearMessages();
    }
    navigation.goBack();
  };

  return (
    <View className="flex-row items-center justify-between bg-white px-4">
      <Pressable onPress={goBack}>
        <BackButton />
      </Pressable>

      <Text className="text-lg font-semibold text-black">{title}</Text>

      <Pressable onPress={goBack}>
        <CloseButton />
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
