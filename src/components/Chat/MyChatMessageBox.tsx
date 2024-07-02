import React from 'react';
import dayjs from 'dayjs';
import { View, Text } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

interface MyChatMessageBoxComponentProps {
  message: ChatMessage;
}

const MyChatMessageBoxComponent: React.FC<MyChatMessageBoxComponentProps> = ({ message }) => {
  return (
    <View className="my-4 flex-row">
      <View className="mr-1 flex-1 flex-col items-end justify-end">
        <Text className="text-[10px] text-gray-300">{dayjs(message.dateTime).format('HH:mm')}</Text>
      </View>

      {/* 메세지 */}
      <View className="max-w-[260px] rounded-b-2xl rounded-tl-2xl bg-main px-4 py-3">
        <View className="">
          <Text className="font-medium text-white">{message.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyChatMessageBoxComponent;
