import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

interface SelectBoxComponentProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = { index: number; content: string; select: boolean };

const SelectBoxComponent: React.FC<SelectBoxComponentProps> = ({ items, setItems }) => {
  // item 선택
  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.index === selectedItem.index ? { ...item, select: !item.select } : item,
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
                className="mb-4 rounded-xl bg-main px-5 py-7"
              >
                <Text className="font-semibold text-white">{item.content}</Text>
              </Pressable>
            ) : (
              <Pressable
                key={item.index}
                onPress={() => select(item)}
                className="mb-4 rounded-xl bg-[#E2E2E2] px-5 py-7"
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
