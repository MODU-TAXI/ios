import React from 'react';
import { Text, View, Pressable } from 'react-native';

import XmarkSvg from '@assets/images/Map/xmark.svg';
import SpotPinGraySvg from '@assets/images/RoomDigest/SpotPinGray.svg';
import SpotCircleMintSvg from '@assets/images/RoomDigest/SpotCircleMint.svg';

interface SpotFilterButtonProps {
  label: string;
  selected: boolean;
  handleDelete?: () => void;
}

/** 카풀팟 태그 필터 버튼 */
const SpotFilterButtonComponent: React.FC<SpotFilterButtonProps> = ({
  label,
  selected,
  handleDelete
}) => {

  if (selected) {
    return (
      <View className="mr-2 flex items-center rounded-full border border-main bg-main text-center">
        <View className="flex flex-row items-center py-2 pl-4 pr-2">
          <SpotCircleMintSvg width={15} height={15} />
          <Text className="ml-1 text-sm font-semibold text-white">{label}</Text>
          <Pressable className="px-2" onPress={handleDelete}>
            <XmarkSvg />
          </Pressable>
        </View>
      </View>
    );
  } else return (
    <View className="mr-2 flex items-center rounded-full border border-gray200 bg-white text-center">
      <View className="flex flex-row items-center px-4 py-2">
        <SpotPinGraySvg width={10.5} height={14} />
        <Text className="pl-1 text-sm text-gray700">{label}</Text>
      </View>
    </View>
  );
};

export default SpotFilterButtonComponent;
