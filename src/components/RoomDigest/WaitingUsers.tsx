import React from 'react';
import { View, Text } from 'react-native';

import ZeroUserComponent from './ZeroUser';
import WaitingUserComponent from './WaitingUser';

import { UserPreview } from '@type/entity/user';
import { RoomWaitingMember } from '@type/entity/room';

interface WaitingUsersComponentProps {
  myRoom: boolean;
  roomWaitingMembers: RoomWaitingMember[];
  applyJoinRoom: (waitingMember: RoomWaitingMember) => Promise<void>;
  openUserInfoModal: (user: UserPreview) => void;
}

const WaitingUsersComponent: React.FC<WaitingUsersComponentProps> = ({
  myRoom,
  roomWaitingMembers,
  applyJoinRoom,
  openUserInfoModal,
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
          openUserInfoModal={openUserInfoModal}
        />
      ))}

      {/* 멤버가 0명일때 보여줄 view */}
      {roomWaitingMembers.length === 0 && <ZeroUserComponent />}
    </View>
  );
};

export default WaitingUsersComponent;
