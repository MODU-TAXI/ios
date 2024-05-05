import { RoomCategory } from '@type/entity/room';
import React from 'react';
import { Text, View } from 'react-native';

/** 카풀팟 방 태그 */
const RoomCategoryComponent: React.FC<RoomCategory> = ({
  label,
  textColor,
  bgColor,
}) => {
  return (
    <View className={`${bgColor} rounded-md mr-2`}>
      <Text className={`text-xs ${textColor} font-medium px-2 py-1`}>
        {label}
      </Text>
    </View>
  );
};

export default RoomCategoryComponent;
