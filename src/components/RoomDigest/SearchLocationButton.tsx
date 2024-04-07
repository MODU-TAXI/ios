import React from 'react';
import { Text, View } from 'react-native';

import MagnifyingGlassSvg from '@assets/images/RoomDigest/MagnifyingGlass.svg';
import XmarkSvg from '@assets/images/RoomDigest/XmarkCircleFill.svg';

interface SearchLocationButtonProps {
  label: string;
}

/** 카풀팟 태그 필터 버튼 */
const SearchLocationButtonComponent = ({
  label,
}: SearchLocationButtonProps) => {
  return (
    <View className="flex bg-box rounded-full mr-2 text-gray700">
      <View className="flex flex-row px-2 py-1.5 items-center">
        <MagnifyingGlassSvg width={20} height={20} />
        <Text className="mx-1 text-gray700 text-sm">{label}</Text>
        <XmarkSvg />
      </View>
    </View>
  );
};

export default SearchLocationButtonComponent;
