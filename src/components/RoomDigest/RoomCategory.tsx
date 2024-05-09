import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { RoomCategory } from 'src/types/entity/room';

interface RoomCategoryComponentProps {
  roomCategory: string;
}

/** 카풀팟 방 태그 */
const RoomCategoryComponent: React.FC<RoomCategoryComponentProps> = ({
  roomCategory,
}) => {
  const [roomTag, setRoomTag] = useState<RoomCategory>({
    label: roomCategory,
    textColor: 'text-gray500',
    bgColor: 'bg-box',
  });

  // useEffect 사용으로 re-render 오류 방지
  useEffect(() => {
    if (roomCategory === '학생인증') {
      setRoomTag({
        label: roomCategory,
        textColor: 'text-main',
        bgColor: 'bg-sub100',
      });
    }
  }, [roomCategory]);

  return (
    <View className={`${roomTag.bgColor} rounded-md mr-2`}>
      <Text className={`text-xs ${roomTag.textColor} font-medium px-2 py-1`}>
        {roomCategory}
      </Text>
    </View>
  );
};

export default RoomCategoryComponent;
