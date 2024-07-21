import React from 'react';
import { View, Text } from 'react-native';

import ZeroUserComponent from './ZeroUser';
import WaitingUserComponent from './WaitingUser';

import { RoomWaitingMember } from '@type/entity/room';

interface WaitingUsersComponentProps {
  myRoom: boolean;
  roomWaitingMembers: RoomWaitingMember[];
  applyJoinRoom: (waitingMember: RoomWaitingMember) => Promise<void>;
}

const WaitingUsersComponent: React.FC<WaitingUsersComponentProps> = ({
  myRoom,
  roomWaitingMembers,
  applyJoinRoom,
}) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-lg font-semibold">대기멤버</Text>
      </View>

      {roomWaitingMembers.map((roomWaitingMember, index) => (
        <WaitingUserComponent
          key={index}
          myRoom={myRoom}
          roomWaitingMember={roomWaitingMember}
          applyJoinRoom={applyJoinRoom}
        />
      ))}

      {/* 멤버가 0명일때 보여줄 view */}
      {roomWaitingMembers.length === 0 && <ZeroUserComponent />}
    </View>
  );
};

export default WaitingUsersComponent;
