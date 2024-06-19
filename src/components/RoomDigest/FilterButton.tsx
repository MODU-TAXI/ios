import React from 'react';
import { Text, View } from 'react-native';

interface FilterButtonProps {
  label: string;
  selected: boolean;
}

/** 카풀팟 태그 필터 버튼 */
const FilterButtonComponent: React.FC<FilterButtonProps> = ({ label, selected }) => {
  if (selected) {
    return (
      <View className="mr-2 flex items-center rounded-full border border-main bg-main">
        <Text className="px-4 py-2 text-sm font-semibold text-white">{label}</Text>
      </View>
    );
  } else return (
    <View className="mr-2 flex items-center rounded-full border border-gray200 bg-white text-center">
      <Text className="px-4 py-2 text-sm text-gray700">{label}</Text>
    </View>
  );
};

export default FilterButtonComponent;
