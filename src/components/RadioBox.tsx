import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import RadioButtonSvg from '@assets/images/RadioBox/RadioButton.svg';
import SelectedRadioButtonSvg from '@assets/images/RadioBox/SelectedRadioButton.svg';

interface RadioBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = { index: number; item: string; select: boolean };

const RadioBoxComponent: React.FC<RadioBoxComponentProps> = ({
  title,
  value,
  setValue,
  items,
  setItems,
}) => {
  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index ? true : false,
    }));
    setItems(updatedItems);
    setValue(selectedItem.item);
  };

  return (
    <View className="flex-col justify-center px-5 py-4 bg-[#E2E2E2] rounded-xl">
      <Text className="text-[#626262]">{title}</Text>

      <View className="flex-row mt-2.5">
        {items.map((item: Item) => {
          return (
            <View key={item.index}>
              {item.select ? (
                <Pressable
                  className="flex-row items-center mr-2.5"
                  onPress={() => select(item)}
                >
                  <SelectedRadioButtonSvg className="mr-1" />
                  <Text>{item.item}</Text>
                </Pressable>
              ) : (
                <Pressable
                  className="flex-row items-center mr-2.5"
                  onPress={() => select(item)}
                >
                  <RadioButtonSvg className="mr-1" />
                  <Text className="text-disabled">{item.item}</Text>
                </Pressable>
              )}
            </View>
          );
        })}

        <View className="flex-row items-center mr-2.5"></View>
      </View>
    </View>
  );
};

export default RadioBoxComponent;
