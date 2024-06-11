import React from "react";
import { View, Text } from "react-native";

import SpotPinSvg from "@assets/images/Map/spotPin.svg";
import SpotPinGraySvg from "@assets/images/Map/spotPinGray.svg";

interface SpotMarkerProps {
  spotName: string;
  selected: boolean;
}

const SpotMarker: React.FC<SpotMarkerProps> = ({
  spotName,
  selected
}) => {
  return (
    <View className="flex-1">
      {selected ? (
        <View className="flex items-center">
          <SpotPinSvg className="z-10 translate-y-2" />
          <View className="flex h-9 w-fit items-center justify-center rounded-full border border-main bg-white px-4">
            <Text className="w-fit font-medium text-base text-main">{spotName}</Text>
          </View>
        </View>
      ) : (
        <View className="flex items-center">
        <SpotPinGraySvg className="z-10 translate-y-2" />
        <View className="flex h-9 w-fit items-center justify-center rounded-full border border-gray400 bg-white px-4">
          <Text className="w-fit font-medium text-base text-gray700">{spotName}</Text>
        </View>
      </View>
      )}
    </View>
  )
};

export default SpotMarker;