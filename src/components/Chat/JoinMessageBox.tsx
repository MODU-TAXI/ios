import React from 'react';
import { View, Text } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

interface JoinMessageBoxComponentProps {
  message: ChatMessage;
}

const JoinMessageBoxComponent: React.FC<JoinMessageBoxComponentProps> = ({ message }) => {
  return (
    <View className="my-4 flex-row items-center">
      <View className="h-[1px] flex-1 bg-gray-200" />
      <Text className="mx-2 text-[12px] font-normal text-gray-700">
        {message.sender}님이 매칭팟에 들어왔어요!
      </Text>
      <View className="h-[1px] flex-1 bg-gray-200" />
    </View>
  );
};

export default JoinMessageBoxComponent;
