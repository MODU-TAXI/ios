import React from 'react';
import { View, Text } from 'react-native';

import { RoomMember } from 'src/types/entity/room';

import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUserComponentProps {
  roomMember: RoomMember;
}

const ParticipateUserComponent: React.FC<ParticipateUserComponentProps> = ({
  roomMember,
}) => {
  return (
    <View
      key={roomMember.memberId}
      className="flex-row justify-between items-center mt-4"
    >
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold">{roomMember.name}</Text>
        {/* 
        {roomMember.score && (
          <Text className="text-lg text-disabled2 font-medium ml-1">(나)</Text>
        )} */}
      </View>

      <Text className="text-lg text-disabled2 font-normal">
        {roomMember.score}'C
      </Text>
    </View>
  );
};

export default ParticipateUserComponent;
