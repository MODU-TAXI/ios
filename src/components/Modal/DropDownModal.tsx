import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface DropDownModalProps {
  handleSelectSortType: (param: string, label: string) => void;
  selectedSortType: string;
}

const DropDownModal: React.FC<DropDownModalProps> = ({
  handleSelectSortType,
  selectedSortType,
}) => {

  return (
    <View className="h-fit w-20 flex-1 flex-col items-center justify-center rounded-xl bg-white px-2 py-0.5 shadow-sm">
      <Pressable onPress={() => handleSelectSortType("NEW", "최신순")} className="w-full items-center border-b border-gray100">
        <Text className={`p-2 text-sm ${selectedSortType === "최신순" ? "text-gray900" : "text-gray600"}`}>최신순</Text>
      </Pressable>
      <Pressable onPress={() => handleSelectSortType("DISTANCE", "거리순")} className="w-full items-center border-b border-gray100">
        <Text className={`p-2 text-sm ${selectedSortType === "거리순" ? "text-gray900" : "text-gray600"}`}>거리순</Text>
      </Pressable>
      <Pressable onPress={() => handleSelectSortType("ENDTIME", "마감순")} className="w-full items-center">
        <Text className={`p-2 text-sm ${selectedSortType === "마감순" ? "text-gray900" : "text-gray600"}`}>마감순</Text>
      </Pressable>
    </View>
  );
};

export default DropDownModal;