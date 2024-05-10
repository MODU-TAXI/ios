import React from 'react';
import { View, Text } from 'react-native';

import { RoomMember } from '@type/entity/room';

import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUserComponentProps {
  roomMember: RoomMember;
}

const ParticipateUserComponent: React.FC<ParticipateUserComponentProps> = ({ roomMember }) => {
  return (
    <View key={roomMember.memberId} className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold">{roomMember.name}</Text>
        {/* 
        {roomMember.score && (
          <Text className="text-lg text-disabled2 font-medium ml-1">(나)</Text>
        )} */}
      </View>

      <Text className="text-lg font-normal text-disabled2">{roomMember.score}'C</Text>
    </View>
  );
};

export default ParticipateUserComponent;
