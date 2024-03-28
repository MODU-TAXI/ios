import React from 'react';
import { Text, View } from 'react-native';

interface RoomTagProps {
  label: string;
  textColor: string;
  bgColor: string;
}

/** 카풀팟 방 태그 */
const RoomTagComponent = ({ label, textColor, bgColor }: RoomTagProps) => {
  return (
    <View className={`${bgColor} rounded-md mr-2`}>
      <Text className={`text-xs ${textColor} font-medium px-2 py-1`}>
        {label}
      </Text>
    </View>
  );
};

export default RoomTagComponent;
