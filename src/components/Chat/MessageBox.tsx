import React from 'react';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

import ProfileImage from '@assets/images/Chat/ProfileImage.svg';

interface MessageBoxComponentProps {
  message: ChatMessage;
  memberId: number;
  openUserInfoModal: (user: UserPreview) => void;
  openImageModal: (imageUrl: string) => void;
  toCalculateScreen: () => void;
}

export const MessageBoxComponent: React.FC<MessageBoxComponentProps> = ({
  message,
  memberId,
  openUserInfoModal,
  openImageModal,
  toCalculateScreen,
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
          <Pressable
            className="flex-row items-center"
            onPress={() =>
              openUserInfoModal({
                memberId: message.memberId,
                nickname: message.sender,
                imageUrl: 'test',
                thisIsMe: false,
              })
            }
          >
            <View className="mr-2 h-6 w-6 flex-row items-center justify-center rounded-full bg-gray-600">
              <ProfileImage className="" />
            </View>

            <View>
              <Text className="font-medium tracking-tight text-[#5D5D5D]">{message.sender}</Text>
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

  if (message.messageType === 'IMAGE') {
    // 내가 보낸거
    if (message.memberId === memberId) {
      return (
        <Pressable className="my-2 flex-row" onPress={() => openImageModal(message.content)}>
          <View className="mr-1 flex-1 flex-col items-end justify-end ">
            <Text className="text-[10px]">2</Text>
            <Text className="text-[10px] text-gray-300">
              {dayjs(message.dateTime).format('HH:MM')}
            </Text>
          </View>

          {/* 이미지 */}
          <FastImage
            className="h-[240px] w-[240px] rounded-xl"
            source={{
              uri: message.content,
            }}
          />
        </Pressable>
      );
    } else {
      // 남이 보낸거
      return (
        <View className="my-2 flex-col">
          <Pressable
            className="flex-row items-center"
            onPress={() =>
              openUserInfoModal({
                memberId: message.memberId,
                nickname: message.sender,
                imageUrl: 'test',
                thisIsMe: false,
              })
            }
          >
            <View className="mr-2 h-6 w-6 flex-row items-center justify-center rounded-full bg-gray-600">
              <ProfileImage className="" />
            </View>

            <View>
              <Text className="font-medium tracking-tight text-[#5D5D5D]">{message.sender}</Text>
            </View>
          </Pressable>

          <Pressable className="ml-4 mt-2 flex-row" onPress={() => openImageModal(message.content)}>
            {/* 이미지 */}
            <FastImage
              className="h-[140px] w-[140px] rounded-xl"
              source={{
                uri: message.content,
              }}
            />

            <View className="ml-1 flex-1 flex-col items-start justify-end">
              <Text className="text-[10px]">2</Text>
              <Text className="text-[10px] text-gray-300">
                {dayjs(message.dateTime).format('HH:MM')}
              </Text>
            </View>
          </Pressable>
        </View>
      );
    }
  }

  if (message.messageType === 'CHAT_BOT') {
    if (message.content === '택시 부르러 가볼까요?') {
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
              <View>
                <Text className="font-medium tracking-tight  text-[#3E3E3E]">
                  택시를 불러볼까요?
                </Text>
              </View>

              <Pressable className="mt-2" onPress={toCalculateScreen}>
                <View className="rounded-lg border-[1px] border-main bg-white px-6 py-3">
                  <Text className="text-[12px] font-medium tracking-tight text-main">
                    택시 부르러 가기
                  </Text>
                </View>
              </Pressable>
            </View>

            <View className="ml-1 flex-1 flex-col items-start justify-end">
              <Text className="text-[10px] tracking-tight">2</Text>
              <Text className="text-[10px] tracking-tight  text-gray-300">
                {dayjs(message.dateTime).format('HH:MM')}
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (message.content === '매칭완료 하시겠습니까?') {
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
              <View>
                <Text className="font-medium tracking-tight  text-[#3E3E3E]">
                  팀원들이 다 모였다면,
                </Text>

                <Text className="mt-1 font-medium tracking-tight  text-[#3E3E3E]">
                  '매칭완료'를 눌러주세요!
                </Text>
              </View>

              <Pressable className="mt-2">
                <View className="rounded-lg border-[1px] border-main bg-white px-6 py-3">
                  <Text className="text-center text-[12px] font-medium tracking-tight text-main">
                    매칭완료
                  </Text>
                </View>
              </Pressable>
            </View>

            <View className="ml-1 flex-1 flex-col items-start justify-end">
              <Text className="text-[10px] tracking-tight">2</Text>
              <Text className="text-[10px] tracking-tight  text-gray-300">
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
