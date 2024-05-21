import React from 'react';
import dayjs from 'dayjs';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

import ProfileImage from '@assets/images/Chat/ProfileImage.svg';

interface MessageBoxComponentProps {
  message: ChatMessage;
  memberId: number;
  openUserInfoModal: () => void;
}

export const MessageBoxComponent: React.FC<MessageBoxComponentProps> = ({
  message,
  memberId,
  openUserInfoModal,
}) => {
  // Join message인 경우
  if (message.messageType === 'JOIN') {
    return (
      <View className="my-4 flex-row items-center">
        <View className="h-[1px] flex-1 bg-gray-200" />
        <Text className="mx-2 text-[12px] font-normal text-gray-700">
          {message.sender}님이 매칭팟에 들어왔어요!
        </Text>
        <View className="h-[1px] flex-1 bg-gray-200" />
      </View>
    );
  }

  // Leave message인 경우
  if (message.messageType === 'LEAVE') {
    return (
      <View className="my-4 flex-row items-center">
        <View className="h-[1px] flex-1 bg-gray-200" />
        <Text className="mx-2 text-[12px] font-normal text-gray-700">
          {message.sender}님이 매칭팟에서 퇴장했어요!
        </Text>
        <View className="h-[1px] flex-1 bg-gray-200" />
      </View>
    );
  }

  if (message.messageType === 'CHAT') {
    // 내가 보낸 메세지일 경우
    if (message.memberId === memberId) {
      return (
        <View className="my-4 flex-row">
          <View className="mr-1 flex-1 flex-col items-end justify-end ">
            <Text className="text-[10px]">2</Text>
            <Text className="text-[10px] text-gray-300">
              {dayjs(message.dateTime).format('HH:MM')}
            </Text>
          </View>

          {/* 메세지 */}
          <View className="max-w-[260px] rounded-b-2xl rounded-tl-2xl bg-main px-4 py-3">
            <View className="">
              <Text className="font-medium text-white">{message.content}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      // 남이 보낸 메세지일 경우
      return (
        <View className="my-4 flex-col">
          <Pressable className="flex-row items-center" onPress={openUserInfoModal}>
            <View className="mr-2 h-6 w-6 flex-row items-center justify-center rounded-full bg-gray-600">
              <ProfileImage className="" />
            </View>

            <View>
              <Text>{message.sender}</Text>
            </View>
          </Pressable>

          <View className="ml-4 mt-2 flex-row">
            {/* 메세지 */}
            <View className="max-w-[260px] rounded-r-2xl rounded-bl-2xl bg-[#F3F4F6] px-4 py-3">
              <View className="">
                <Text className="font-medium  text-black">{message.content}</Text>
              </View>
            </View>

            <View className="ml-1 flex-1 flex-col items-start justify-end">
              <Text className="text-[10px]">2</Text>
              <Text className="text-[10px] text-gray-300">
                {dayjs(message.dateTime).format('HH:MM')}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  return <View></View>;
};
