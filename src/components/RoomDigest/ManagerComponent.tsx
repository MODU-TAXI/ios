import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { RoomMember } from '@type/entity/room';

interface ManagerComponentProps {
  manager: RoomMember;
}

const ManagerComponent: React.FC<ManagerComponentProps> = ({ manager }) => {
  return (
    <View className="px-1 py-8">
      <View>
        <Text className="text-lg font-semibold">방장</Text>
      </View>

      <View key={manager.memberId} className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FastImage
            source={{ uri: manager.imageUrl }}
            className="mr-2 h-[24px] w-[24px] rounded-full"
          />

          <Text className="font-normal text-base">{manager.nickname}</Text>
          {manager.thisIsMe && (
            <Text className="ml-1 text-lg font-medium text-disabled2">(나)</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ManagerComponent;
