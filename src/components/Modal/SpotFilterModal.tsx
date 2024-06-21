import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import SpotSelectionSearchComponent from "@components/Search/SpotSelectionSearch";

import { SpotMap } from "@type/entity/spot";

interface SpotFilterModalProps {
  spotData: SpotMap;
  handleClose: () => void;
  handleFilter: (category: string, value: any) => void;
}

const SpotFilterModalScreen: React.FC<SpotFilterModalProps> = ({
  spotData,
  handleClose,
  handleFilter
}) => {
  const [selectedSpotId, setSelectedSpotId] = useState<number>(0);
  
  const handleSpotSelection = (spotId: number) => {
    if (selectedSpotId === spotId) {
      setSelectedSpotId(0);
    } else {
      setSelectedSpotId(spotId);
    }
  }

  const applySpotFilter = () => {
    handleFilter("spotId", selectedSpotId);
    handleClose();
  }

  return (
    <View className="-mb-20 flex h-full w-full flex-col items-center pt-4">
      <Text className="mb-8 text-lg font-semibold">거점지 리스트</Text>

      <View className="h-full w-full flex-1">
        {spotData.spots.map((spot, index) => (
          <Pressable
            key={index}  
            onPress={() => handleSpotSelection(spot.id)}
          >
            <SpotSelectionSearchComponent
              spotName={spot.name}
              address={spot.address}
              distance={0.5}
              isFirst={index === 0}
              selected={spot.id === selectedSpotId}
            />
          </Pressable>
        ))}

      </View>

      <View className="w-full p-4">
      {selectedSpotId ? (
        <Pressable
          className="flex h-[56px] items-center justify-center rounded-full bg-main"
          onPress={applySpotFilter}
        >
          <Text className="font-semibold text-white">거점지로 가는 택시팟 보기</Text>
        </Pressable>
      ) : (
        <Pressable
          className="flex h-[56px] items-center justify-center rounded-full bg-gray500"
          disabled={true}
        >
          <Text className="font-semibold text-white">거점지로 가는 택시팟 보기</Text>
        </Pressable>
      )}
      </View>
    </View>
  )
};

export default SpotFilterModalScreen;