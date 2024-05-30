import React from "react"
import { View, Text } from "react-native"

import SpotCircleMintReverse from "@assets/images/Search/SpotCircleMintReverse.svg"

interface SpotSearchProps {
  spotName: string
}

const SpotSearchComponent: React.FC<SpotSearchProps> = ({
  spotName
}) => {
  return (
    <View className="flex flex-row items-center py-3">
      <View className='ml-2 flex flex-col'>
        <View className='mb-1 flex flex-row items-center'>
          <SpotCircleMintReverse />
          <Text className="ml-1 font-medium text-base text-main">{spotName}</Text>
        </View>
      </View>
    </View>
  )
}

export default SpotSearchComponent;