import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { RoomWaitingMember } from 'src/types/entity/room';

import WaitingUserComponent from './WaitingUser';

import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface WaitingUsersComponentProps {
  roomWaitingMembers: RoomWaitingMember[];
  applyJoinRoom: (memberId: number) => Promise<void>;
}

const WaitingUsersComponent: React.FC<WaitingUsersComponentProps> = ({
  roomWaitingMembers,
  applyJoinRoom,
}) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-[20px] font-semibold">대기멤버</Text>
      </View>

      {roomWaitingMembers.map((roomWaitingMember, index) => (
        <WaitingUserComponent
          key={index}
          roomWaitingMember={roomWaitingMember}
          applyJoinRoom={applyJoinRoom}
        />
      ))}
    </View>
  );
};

export default WaitingUsersComponent;
