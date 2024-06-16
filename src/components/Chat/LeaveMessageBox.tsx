import React from 'react';
import { View, Text } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

interface LeaveMessageBoxComponentProps {
  message: ChatMessage;
}

const LeaveMessageBoxComponent: React.FC<LeaveMessageBoxComponentProps> = ({ message }) => {
  return (
    <View className="my-4 flex-row items-center">
      <View className="h-[1px] flex-1 bg-gray-200" />
      <Text className="mx-2 text-[12px] font-normal text-gray-700">
        {message.sender}님이 매칭팟에서 퇴장했어요!
      </Text>
      <View className="h-[1px] flex-1 bg-gray-200" />
    </View>
  );
};

export default LeaveMessageBoxComponent;
