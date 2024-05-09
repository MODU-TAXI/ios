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
    <View className="mr-2 flex items-center rounded-full border border-gray200 bg-white text-center">
      <View className="flex flex-row items-center px-4 py-2">
        <SpotPinGraySvg width={10.5} height={14} />
        <Text className="pl-1 text-sm text-gray700">{label}</Text>
      </View>
    </View>
  );
};

export default SpotFilterButtonComponent;
