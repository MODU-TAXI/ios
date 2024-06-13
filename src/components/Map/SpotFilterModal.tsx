import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import SpotSelectionSearchComponent from "@components/Search/SpotSelectionSearch";

interface SpotFilterModalProps {
  handleClose: () => void;
}

const SpotFilterModalScreen: React.FC<SpotFilterModalProps> = ({
  handleClose
}) => {
  const [selectedSpot, setSelectedSpot] = useState<number>(1);

  return (
    <View className="-mb-20 flex h-full w-full flex-col items-center pt-4">
      <Text className="mb-8 text-lg font-semibold">거점지 리스트</Text>

      <View className="h-full w-full flex-1">
        <SpotSelectionSearchComponent 
          spotName="주안역"
          address="서울특별시 중구 주안동"
          distance={0.5}
          isFirst={true}
          selected={false}
        />
        <SpotSelectionSearchComponent 
          spotName="주안역"
          address="서울특별시 중구 주안동"
          distance={0.5}
          isFirst={false}
          selected={true}
        />
        <SpotSelectionSearchComponent 
          spotName="주안역"
          address="서울특별시 중구 주안동"
          distance={0.5}
          isFirst={false}
          selected={false}
        />
      </View>

      <View className="w-full p-4">
      {selectedSpot ? (
        <Pressable
          className="flex h-[56px] items-center justify-center rounded-full bg-main"
          onPress={handleClose}
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