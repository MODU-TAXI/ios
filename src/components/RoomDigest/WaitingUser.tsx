import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { UserPreview } from '@type/entity/user';
import { RoomWaitingMember } from '@type/entity/room';

interface WaitingUserComponentProps {
  myRoom: boolean;
  roomWaitingMember: RoomWaitingMember;
  applyJoinRoom: (waitingMember: RoomWaitingMember) => Promise<void>;
  openUserInfoModal: (user: UserPreview) => void;
}
const WaitingUserComponent: React.FC<WaitingUserComponentProps> = ({
  myRoom,
  roomWaitingMember,
  applyJoinRoom,
  openUserInfoModal,
}) => {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <Pressable
        className="flex-row items-center"
        onPress={() => openUserInfoModal(roomWaitingMember)}
      >
        <FastImage
          source={{ uri: roomWaitingMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full "
        />

        <Text className="mr-1 font-normal text-base">{roomWaitingMember.nickname}</Text>
      </Pressable>

      {myRoom ? (
        <Pressable
          className="rounded-3xl bg-sub100 px-3 py-2"
          onPress={() => applyJoinRoom(roomWaitingMember)}
        >
          <Text className="text-[12px] font-medium text-main">참여수락</Text>
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

export default WaitingUserComponent;
