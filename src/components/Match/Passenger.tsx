import React from 'react';
import { View, Pressable } from 'react-native';

interface PassengerComponentProps {
  index: number;
  unSelectedIcon: JSX.Element;
  selectedIcon: JSX.Element;
  passengersNumber: number | null;
  setPassengersNumber: React.Dispatch<React.SetStateAction<number | null>>;
}

// 인원수 component -> 재사용 안할 것 같아서 그냥 여기 정의
const PassengerComponent: React.FC<PassengerComponentProps> = ({
  index,
  unSelectedIcon,
  selectedIcon,
  passengersNumber,
  setPassengersNumber,
}) => {
  const isSelected = passengersNumber === index;

  // 인원수 선택
  const handlePress = (index: number) => {
    setPassengersNumber(index);
  };

  return (
    <View>
      {isSelected ? (
        <Pressable key={index} onPress={() => handlePress(index)}>
          {selectedIcon}
        </Pressable>
      ) : (
        <Pressable key={index} onPress={() => handlePress(index)}>
          {unSelectedIcon}
        </Pressable>
      )}
    </View>
  );
};

export default PassengerComponent;
