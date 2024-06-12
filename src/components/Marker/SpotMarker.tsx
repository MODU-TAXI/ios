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
    <View className="flex flex-1 items-center">
      {selected ? (
        <>
          <SpotPinSvg width={40} className="relative z-10 translate-y-2" />
          <View className="relative z-0 flex h-9 w-fit items-center justify-center rounded-full border border-main bg-white px-4" >
            <Text className="w-fit text-sm font-medium text-main">{spotName}</Text>
          </View>
        </>
      ) : (
        <>
          <SpotPinGraySvg width={32} className="relative z-10 translate-y-2" />
          <View className="relative z-0 flex h-9 w-fit items-center justify-center rounded-full border border-gray400 bg-white px-4" >
            <Text className="w-fit text-sm font-medium text-gray700">{spotName}</Text>
          </View>
        </>
      )}
    </View>
  )
};

export default SpotMarker;