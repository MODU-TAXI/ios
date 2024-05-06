import React from 'react';
import { Text, View } from 'react-native';

import SpotPinGraySvg from '@assets/images/RoomDigest/SpotPinGray.svg';

interface SpotFilterButtonProps {
  label: string;
}

/** 카풀팟 태그 필터 버튼 */
const SpotFilterButtonComponent: React.FC<SpotFilterButtonProps> = ({
  label,
}) => {
  return (
    <View className="flex bg-white border border-gray200 rounded-full mr-2 text-center items-center">
      <View className="flex flex-row px-4 py-2 items-center">
        <SpotPinGraySvg width={10.5} height={14} />
        <Text className="pl-1 text-gray700 text-sm">{label}</Text>
      </View>
    </View>
  );
};

export default SpotFilterButtonComponent;
