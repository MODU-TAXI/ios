import React from 'react';
import { Text, View } from 'react-native';

interface FilterButtonProps {
  label: string;
}

/** 카풀팟 태그 필터 버튼 */
const FilterButtonComponent = ({ label }: FilterButtonProps) => {
  return (
    <View className="flex bg-white border border-gray200 rounded-full mr-2 text-center items-center">
      <Text className="text-gray700 text-sm px-4 py-2">{label}</Text>
    </View>
  );
};

export default FilterButtonComponent;
