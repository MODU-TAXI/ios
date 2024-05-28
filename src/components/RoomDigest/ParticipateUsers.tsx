import React from 'react';
import { View, Text } from 'react-native';

import ParticipateUserComponent from '@components/RoomDigest/ParticipateUser';

import { RoomMember } from '@type/entity/room';

interface ParticipateUsersComponentProps {
  roomMembers: RoomMember[];
}

const ParticipateUsersComponent: React.FC<ParticipateUsersComponentProps> = ({ roomMembers }) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-[20px] font-semibold">참여멤버</Text>
      </View>

      {roomMembers.map((roomMember, index) => (
        <ParticipateUserComponent key={index} roomMember={roomMember} />
      ))}
    </View>
  );
};

export default ParticipateUsersComponent;
