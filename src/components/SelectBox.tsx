import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';

interface SelectBoxComponentProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = { index: number; content: string; select: boolean };

const SelectBoxComponent: React.FC<SelectBoxComponentProps> = ({
  items,
  setItems,
}) => {
  // item 선택
  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.index === selectedItem.index
        ? { ...item, select: !item.select }
        : item,
    );
    setItems(updatedItems);
  };

  return (
    <View>
      {items.map((item: Item) => {
        return (
          <View key={item.index}>
            {item.select ? (
              <Pressable
                key={item.index}
                onPress={() => select(item)}
                className="bg-black rounded-xl py-7 px-5 mb-4"
              >
                <Text className="text-white font-semibold">{item.content}</Text>
              </Pressable>
            ) : (
              <Pressable
                key={item.index}
                onPress={() => select(item)}
                className="bg-[#E2E2E2] rounded-xl py-7 px-5 mb-4"
              >
                <Text className="font-semibold">{item.content}</Text>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default SelectBoxComponent;
