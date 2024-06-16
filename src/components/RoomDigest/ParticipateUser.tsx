import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { RoomMember } from '@type/entity/room';

import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUserComponentProps {
  roomMember: RoomMember;
}

const ParticipateUserComponent: React.FC<ParticipateUserComponentProps> = ({ roomMember }) => {
  return (
    <View key={roomMember.memberId} className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <FastImage
          source={{ uri: roomMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="font-normal text-base">{roomMember.nickname}</Text>
        {roomMember.thisIsMe && (
          <Text className="ml-1 text-lg font-medium text-disabled2">(나)</Text>
        )}
      </View>
    </View>
  );
};

export default ParticipateUserComponent;
