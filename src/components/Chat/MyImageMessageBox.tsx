import React from 'react';
import dayjs from 'dayjs';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface MyImageMessageBoxComponentProps {
  message: ChatMessage;
  openImageModal: (imageUrl: string) => void;
}

const MyImageMessageBoxComponent: React.FC<MyImageMessageBoxComponentProps> = ({
  message,
  openImageModal,
}) => {
  return (
    <Pressable className="my-2 flex-row" onPress={() => openImageModal(message.content)}>
      <View className="mr-1 flex-1 flex-col items-end justify-end ">
        <Text className="text-[10px] text-gray-300">{dayjs(message.dateTime).format('HH:mm')}</Text>
      </View>

      {/* 이미지 */}
      <FastImage
        className="h-[200px] w-[200px] rounded-xl"
        source={{
          uri: message.content,
        }}
      />
    </Pressable>
  );
};

export default MyImageMessageBoxComponent;
