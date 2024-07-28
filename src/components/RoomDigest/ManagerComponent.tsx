import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { RoomMember } from '@type/entity/room';
import { UserPreview } from '@type/entity/user';

interface ManagerComponentProps {
  manager: RoomMember;
  openUserInfoModal: (user: UserPreview) => void;
}

const ManagerComponent: React.FC<ManagerComponentProps> = ({ manager, openUserInfoModal }) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-lg font-semibold">방장</Text>
      </View>

      <View key={manager.memberId} className="mt-4 flex-row items-center justify-between">
        <Pressable className="flex-row items-center" onPress={() => openUserInfoModal(manager)}>
          <FastImage
            source={{ uri: manager.imageUrl }}
            className="mr-2 h-[24px] w-[24px] rounded-full"
          />

          <Text className="font-normal text-base">{manager.nickname}</Text>
          {manager.thisIsMe && (
            <Text className="ml-1 text-lg font-medium text-disabled2">(나)</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ManagerComponent;
