import React from 'react';
import { View } from 'react-native';

import { RoomCategory } from 'src/types/entity/room';

import RoomCategoryComponent from '@components/RoomDigest/RoomCategory';

interface RoomCategoriesComponent {
  roomCategories: string[];
}

const RoomCategoriesComponent: React.FC<RoomCategoriesComponent> = ({
  roomCategories,
}) => {
  return (
    <View className="flex-row">
      {roomCategories.map((roomCategory, index) => (
        <RoomCategoryComponent key={index} roomCategory={roomCategory} />
      ))}
    </View>
  );
};

export default RoomCategoriesComponent;
