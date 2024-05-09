import React from 'react';
import { View, Text, Pressable } from 'react-native';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';
import { RoomWaitingMember } from '@type/entity/room';

interface WaitingUserComponentProps {
  roomWaitingMember: RoomWaitingMember;
  applyJoinRoom: (memberId: number) => Promise<void>;
}
const WaitingUserComponent: React.FC<WaitingUserComponentProps> = ({
  roomWaitingMember,
  applyJoinRoom,
}) => {
  return (
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold mr-1">
          {roomWaitingMember.name}
        </Text>
        <Text className="text-[20px] text-disabled2 font-normal">
          ({roomWaitingMember.score}'C)
        </Text>
      </View>

      <Pressable
        className="bg-sub100 px-3 py-2 rounded-3xl"
        onPress={() => applyJoinRoom(roomWaitingMember.memberId)}
      >
        <Text className="text-[12px] font-medium text-main">참여수락</Text>
      </Pressable>
    </View>
  );
};

export default WaitingUserComponent;
