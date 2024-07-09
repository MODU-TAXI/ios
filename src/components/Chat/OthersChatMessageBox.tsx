import React from 'react';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface OthersChatMessageBoxComponentProps {
  message: ChatMessage;
  openUserInfoModal: (user: UserPreview) => void;
}

const OthersChatMessageBoxComponent: React.FC<OthersChatMessageBoxComponentProps> = ({
  message,
  openUserInfoModal,
}) => {
  const messageMargin =
    message.first && message.last
      ? 'flex-col my-4'
      : message.first
        ? 'flex-col mt-4 mb-1'
        : message.last
          ? 'flex-col mt-1 mb-4'
          : 'flex-col my-1';

  return (
    <View className={messageMargin}>
      {message.first && (
        <View className="flex-row items-center">
          <Pressable
            onPress={() =>
              openUserInfoModal({
                memberId: message.memberId,
                nickname: message.sender,
                imageUrl: message.imageUrl,
                thisIsMe: false,
              })
            }
          >
            <FastImage
              source={{ uri: message.imageUrl }}
              className="mr-2 h-[24px] w-[24px] rounded-full"
            />
          </Pressable>

          <View>
            <Text className="font-medium tracking-tight text-[#5D5D5D]">{message.sender}</Text>
          </View>
        </View>
      )}

      <View className="ml-4 mt-2 flex-row">
        {/* 메세지 */}
        <View className="max-w-[260px] rounded-r-2xl rounded-bl-2xl bg-[#F3F4F6] px-4 py-3">
          <View className="">
            <Text className="font-medium text-black">{message.content}</Text>
          </View>
        </View>

        <View className="ml-1 flex-1 flex-col items-start justify-end">
          {message.last && (
            <Text className="text-[10px] text-gray-300">
              {dayjs(message.dateTime).format('HH:mm')}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default OthersChatMessageBoxComponent;
