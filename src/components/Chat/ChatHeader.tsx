import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '@assets/images/Header/BackButton.svg';
import HeaderDots from '@assets/images/Header/HeaderDots.svg';

interface ChatHeaderComponentProps {
  openExitModal: () => Promise<void>;
  myRoom: boolean;
  readonly: boolean;
}

const ChatHeaderComponent: React.FC<ChatHeaderComponentProps> = ({
  openExitModal,
  myRoom,
  readonly,
}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-row items-center justify-between bg-white px-4">
      <Pressable onPress={goBack}>
        <BackButton />
      </Pressable>

      {readonly ? (
        <Text className="text-lg font-semibold text-black">채팅 기록</Text>
      ) : (
        <Text className="text-lg font-semibold text-black">채팅 페이지</Text>
      )}

      {myRoom ? (
        <View className="h-10 w-10 bg-white" />
      ) : (
        <Pressable onPress={openExitModal}>
          <HeaderDots />
        </Pressable>
      )}
    </View>
  );
};

export default ChatHeaderComponent;
