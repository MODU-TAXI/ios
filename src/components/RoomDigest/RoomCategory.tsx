import React from 'react';
import { Text, View } from 'react-native';
import { RoomCategory } from '@type/entity/room';

interface RoomCategoryComponentProps {
  roomCategory: RoomCategory;
}

/** 카풀팟 방 태그 */
const RoomCategoryComponent: React.FC<RoomCategoryComponentProps> = ({
  roomCategory,
}) => {
  return (
    <View className={`${roomCategory.bgColor} rounded-md mr-2`}>
      <Text
        className={`text-xs ${roomCategory.textColor} font-medium px-2 py-1`}
      >
        {roomCategory.label}
      </Text>
    </View>
  );
};

export default RoomCategoryComponent;
