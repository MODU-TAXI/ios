import React from 'react';
import dayjs from 'dayjs';
import { View, Text } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

import ModutaxiBotImage from '@assets/images/Chat/ModutaxiBotChatImage.svg';

interface MatchCompleteMessageBoxComponentProps {
  message: ChatMessage;
  matchComplete: () => void;
}

const MatchCompleteMessageBoxComponent: React.FC<MatchCompleteMessageBoxComponentProps> = ({
  message,
  matchComplete,
}) => {
  return (
    <View className="my-4 flex-col">
      <View className="flex-row items-center">
        <View className="mr-2 h-6 w-6 flex-row items-center justify-center rounded-full bg-gray-600">
          <ModutaxiBotImage />
        </View>

        <View>
          <Text className="font-medium tracking-tight text-[#5D5D5D]">모두의 택시 봇</Text>
        </View>
      </View>

      <View className="ml-4 mt-2 flex-row">
        {/* 메세지 */}
        <View className="max-w-[260px] rounded-r-2xl rounded-bl-2xl bg-[#F3F4F6] px-4 py-3">
          <View>
            <Text className="font-medium tracking-tight  text-[#3E3E3E]">
              팀원들이 다 모였다면,
            </Text>

            <Text className="mt-1 font-medium tracking-tight  text-[#3E3E3E]">
              '매칭완료'를 눌러주세요!
            </Text>
          </View>

          {/* <Pressable className="mt-2" onPress={matchComplete}>
            <View className="rounded-lg border-[1px] border-main bg-white px-6 py-3">
              <Text className="text-center text-[12px] font-medium tracking-tight text-main">
                매칭완료
              </Text>
            </View>
          </Pressable> */}
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

export default MatchCompleteMessageBoxComponent;
