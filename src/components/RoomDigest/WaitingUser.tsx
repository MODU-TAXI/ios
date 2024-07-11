import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { RoomWaitingMember } from '@type/entity/room';

// import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface WaitingUserComponentProps {
  myRoom: boolean;
  roomWaitingMember: RoomWaitingMember;
  applyJoinRoom: (memberId: number) => Promise<void>;
}
const WaitingUserComponent: React.FC<WaitingUserComponentProps> = ({
  myRoom,
  roomWaitingMember,
  applyJoinRoom,
}) => {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <FastImage
          source={{ uri: roomWaitingMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="mr-1 font-normal text-base">{roomWaitingMember.nickname}</Text>
      </View>

      {myRoom ? (
        <Pressable
          className="rounded-3xl bg-sub100 px-3 py-2"
          onPress={() => applyJoinRoom(roomWaitingMember.memberId)}
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
