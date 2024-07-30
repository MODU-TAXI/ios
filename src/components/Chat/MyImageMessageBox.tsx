import React from 'react';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';

interface MyImageMessageBoxComponentProps {
  message: ChatMessage;
  openImageModal: (imageUrl: string) => void;
}

const MyImageMessageBoxComponent: React.FC<MyImageMessageBoxComponentProps> = ({
  message,
  openImageModal,
}) => {
  const messageMargin =
    message.first && message.last
      ? 'flex-row my-4'
      : message.first
        ? 'flex-row mt-1 mb-1'
        : message.last
          ? 'flex-row mt-1 mb-4'
          : 'flex-row my-2';

  return (
    <View className={messageMargin}>
      <View className="mr-1 flex-1 flex-col items-end justify-end ">
        {message.last && (
          <Text className="text-[10px] text-gray-300">
            {dayjs(message.dateTime).format('HH:mm')}
          </Text>
        )}
      </View>

      {/* 이미지 */}
      <Pressable onPress={() => openImageModal(message.content)}>
        <FastImage
          className="h-[200px] w-[200px] rounded-xl"
          source={{
            uri: message.content,
          }}
        />
      </Pressable>
    </View>
  );
};

export default MyImageMessageBoxComponent;
