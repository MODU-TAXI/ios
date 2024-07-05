import React from "react"
import { View, Text } from "react-native"

import { modifyDistStr } from "@utils/search";

import SpotCircleMintReverse from "@assets/images/Search/SpotCircleMintReverse.svg"

interface SpotSearchProps {
  spotName: string;
  address: string;
  distance: number;
  isFirst: boolean;
  selected: boolean;
}

const SpotSelectionSearchComponent: React.FC<SpotSearchProps> = ({
  spotName,
  address,
  distance,
  isFirst,
  selected
}) => {
  return (
    <View 
      className="flex flex-row items-center px-4"
      style={{
        backgroundColor: selected ? 'rgba(64, 206, 172, 0.2)' : 'transparent'
      }}
    >
      <View className={`ml-2 py-3 ${!isFirst && "border-t border-gray100"} flex flex-col`}>

        <View className="mb-1 flex flex-row items-center">
          <SpotCircleMintReverse />
          <Text className="ml-1 font-medium text-base text-main">{spotName}</Text>
        </View>

        <View className="flex w-full flex-row">
          <Text 
            className="w-4/5 text-left text-sm text-gray600"
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {address}
          </Text>
          <Text className="w-1/5 text-right text-sm text-gray600"></Text>
        </View>
      </View>
    </View>
  )
}

export default SpotSelectionSearchComponent;