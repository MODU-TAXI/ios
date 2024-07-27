import React from 'react';
import { View, Text } from 'react-native';

import ZeroUserComponent from './ZeroUser';

import ParticipateUserComponent from '@components/RoomDigest/ParticipateUser';

import { RoomMember } from '@type/entity/room';
import { UserPreview } from '@type/entity/user';

interface ParticipateUsersComponentProps {
  roomMembers: RoomMember[];
  openUserInfoModal: (user: UserPreview) => void;
}

const ParticipateUsersComponent: React.FC<ParticipateUsersComponentProps> = ({
  roomMembers,
  openUserInfoModal,
}) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-lg font-semibold">참여멤버</Text>
      </View>

      {roomMembers.map((roomMember, index) => (
        <ParticipateUserComponent
          key={index}
          roomMember={roomMember}
          openUserInfoModal={openUserInfoModal}
        />
      ))}

      {/* 멤버가 0명일때 보여줄 view */}
      {roomMembers.length === 0 && <ZeroUserComponent />}
    </View>
  );
};

export default ParticipateUsersComponent;
