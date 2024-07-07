import React from 'react';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface OthersImageMessageBoxComponentProps {
  message: ChatMessage;
  openUserInfoModal: (user: UserPreview) => void;
  openImageModal: (imageUrl: string) => void;
}

const OthersImageMessageBoxComponent: React.FC<OthersImageMessageBoxComponentProps> = ({
  message,
  openUserInfoModal,
  openImageModal,
}) => {
  return (
    <View className="my-2 flex-col">
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

      <Pressable className="ml-4 mt-2 flex-row" onPress={() => openImageModal(message.content)}>
        {/* 이미지 */}
        <FastImage
          className="h-[200px] w-[200px] rounded-xl"
          source={{
            uri: message.content,
          }}
        />

        <View className="ml-1 flex-1 flex-col items-start justify-end">
          <Text className="text-[10px] text-gray-300">
            {dayjs(message.dateTime).format('HH:mm')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default OthersImageMessageBoxComponent;
