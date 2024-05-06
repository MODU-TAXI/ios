import React from 'react';
import { View } from 'react-native';
import { RoomCategory } from '@type/entity/room';
import RoomTagComponent from '@components/RoomDigest/RoomCategory';

interface RoomCategoriesComponent {
  roomCategories: RoomCategory[];
}

const RoomCategoriesComponent: React.FC<RoomCategoriesComponent> = ({
  roomCategories,
}) => {
  return (
    <View className="flex-row">
      {roomCategories.map((roomCategory, index) => (
        <RoomTagComponent key={index} roomCategory={roomCategory} />
      ))}
    </View>
  );
};

export default RoomCategoriesComponent;
