import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { MessageBody } from '@type/entity/chat';

import ScrollBottomButton from '@assets/images/Chat/ScrollBottomButton.svg';

interface LastMessageComponentProps {
  lastMessage: MessageBody;
  toBottom: () => void;
}

const LastMessageComponent: React.FC<LastMessageComponentProps> = ({ lastMessage, toBottom }) => {
  if (lastMessage.messageType !== 'CHAT' && lastMessage.messageType !== 'IMAGE')
    return <ScrollBottomButton onPress={toBottom} className="absolute bottom-0 right-3 p-4" />;

  return (
    <View className="absolute bottom-0 max-h-10 w-full ">
      <Pressable
        style={{ backgroundColor: 'rgba(62, 62, 62, 0.85)' }}
        className="mx-4 flex-1 flex-row items-center rounded-lg px-4 py-3 "
        onPress={toBottom}
      >
        <FastImage
          source={{ uri: lastMessage.imageUrl }}
          className="mr-1 h-[20px] w-[20px] rounded-full"
        />
        <Text className="mr-1 text-[12px] font-medium tracking-tight text-[#AFAFAF]">
          {lastMessage.sender}
        </Text>

        <Text className="max-w-[250px] text-[12px] font-medium tracking-tight  text-[#EBEBEB] ">
          {lastMessage.messageType === 'CHAT' ? lastMessage.content : '사진'}
        </Text>
      </Pressable>
    </View>
  );
};

export default LastMessageComponent;
