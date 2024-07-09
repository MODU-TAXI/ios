import React from 'react';
import dayjs from 'dayjs';
import { View, Text } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

import ProfileImage from '@assets/images/Chat/ProfileImage.svg';

interface ChatBotMessageBoxComponentProps {
  message: ChatMessage;
}

const ChatBotMessageBoxComponent: React.FC<ChatBotMessageBoxComponentProps> = ({ message }) => {
  const [arriveTime, payment] = message.content.split('\n');

  return (
    <View className="my-4 flex-col">
      <View className="flex-row items-center">
        <View className="mr-2 h-6 w-6 flex-row items-center justify-center rounded-full bg-gray-600">
          <ProfileImage className="" />
        </View>

        <View>
          <Text className="font-medium tracking-tight text-[#5D5D5D]">모두의 택시 봇</Text>
        </View>
      </View>

      <View className="ml-4 mt-2 flex-row">
        {/* 메세지 */}
        <View className="max-w-[260px] rounded-r-2xl rounded-bl-2xl bg-[#F3F4F6] px-4 py-3">
          <Text className="font-medium tracking-tight  text-[#3E3E3E]">{arriveTime}</Text>

          <Text className="mt-1 font-medium tracking-tight  text-[#3E3E3E] ">{payment}</Text>
        </View>

        <View className="ml-1 flex-1 flex-col items-start justify-end">
          <Text className="text-[10px] tracking-tight  text-gray-300">
            {dayjs(message.dateTime).format('HH:mm')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatBotMessageBoxComponent;
