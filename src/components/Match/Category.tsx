import React from 'react';
import { View, Text, Pressable } from 'react-native';

import CheckBox from '@assets/images/Match/CheckBox.svg';
import SelectedCheckBox from '@assets/images/Match/SelectedCheckBox.svg';

interface CategoryComponentProps {
  checkedCategorys: boolean[];
  setCheckedCategorys: React.Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
  category: string;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  checkedCategorys,
  setCheckedCategorys,
  index,
  category,
}) => {
  const checked = checkedCategorys[index];

  // 카테고리 선택
  const selectCategory = (index: number) => {
    setCheckedCategorys((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <View>
      {checked ? (
        <Pressable
          onPress={() => selectCategory(index)}
          className="flex-row items-center justify-center rounded-xl border-2 border-main px-3 py-2"
        >
          <SelectedCheckBox className="mr-2" />
          <Text className="text-sm font-semibold text-main">{category}</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => selectCategory(index)}
          className="flex-row items-center justify-center rounded-xl border-2 border-gray200 px-3 py-2"
        >
          <CheckBox className="mr-2" />
          <Text className="text-sm font-normal text-gray700">{category}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CategoryComponent;
