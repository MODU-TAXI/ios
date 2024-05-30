import React from 'react';
import { View, Text } from 'react-native';

import ZeroUserComponent from './ZeroUser';

import ParticipateUserComponent from '@components/RoomDigest/ParticipateUser';

import { RoomMember } from '@type/entity/room';

interface ParticipateUsersComponentProps {
  roomMembers: RoomMember[];
}

const ParticipateUsersComponent: React.FC<ParticipateUsersComponentProps> = ({ roomMembers }) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-lg font-semibold">참여멤버</Text>
      </View>

      {roomMembers.map((roomMember, index) => (
        <ParticipateUserComponent key={index} roomMember={roomMember} />
      ))}

      {/* 멤버가 0명일때 보여줄 view */}
      {roomMembers.length === 0 && <ZeroUserComponent />}
    </View>
  );
};

export default ParticipateUsersComponent;
