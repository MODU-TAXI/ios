import React from 'react';
import { View, Text } from 'react-native';

import { RoomMember } from 'src/types/entity/room';

import ParticipateUserComponent from '@components/RoomDigest/ParticipateUser';

interface ParticipateUsersComponentProps {
  roomMembers: RoomMember[];
}

const users = [
  {
    id: 1,
    nickname: '졸다가 늦은 판다',
    temperature: 36.5,
    me: false,
  },
  {
    id: 2,
    nickname: '졸다가 늦은 판다',
    temperature: 36.5,
    me: false,
  },
  {
    id: 3,
    nickname: '졸다가 늦은 판다',
    temperature: 36.5,
    me: false,
  },
];

const ParticipateUsersComponent: React.FC<ParticipateUsersComponentProps> = ({
  roomMembers,
}) => {
  return (
    <View className="py-8 px-1">
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
