import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { RoomMember } from '@type/entity/room';
import { UserPreview } from '@type/entity/user';

interface ParticipateUserComponentProps {
  roomMember: RoomMember;
  openUserInfoModal: (user: UserPreview) => void;
}

const ParticipateUserComponent: React.FC<ParticipateUserComponentProps> = ({
  roomMember,
  openUserInfoModal,
}) => {
  return (
    <View key={roomMember.memberId} className="mt-4 flex-row items-center justify-between">
      <Pressable className="flex-row items-center" onPress={() => openUserInfoModal(roomMember)}>
        <FastImage
          source={{ uri: roomMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="font-normal text-base">{roomMember.nickname}</Text>
        {roomMember.thisIsMe && (
          <Text className="ml-1 text-lg font-medium text-disabled2">(나)</Text>
        )}
      </Pressable>
    </View>
  );
};

export default ParticipateUserComponent;
