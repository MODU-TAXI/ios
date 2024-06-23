import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

interface MiddleComponentProps {
  toMapScreen: () => void;
  toCreateRoomScreen: () => void;
}

const MiddleComponent: React.FC<MiddleComponentProps> = ({ toMapScreen, toCreateRoomScreen }) => {
  return (
    <View className="mt-4 h-64 flex-row justify-evenly px-3">
      <Pressable onPress={toCreateRoomScreen} className="flex-1 items-center pr-2">
        <Image 
          source={require('@assets/images/Home/RoadPng.png')} 
          className="h-full w-full"
          resizeMode="contain"
        />
        <View className="absolute bottom-6 left-4 flex items-start">
          <Text className="text-sm text-white">지금 당장 함께할</Text>
          <Text className="font-semibold text-base text-white">택시팟 만들기</Text>
        </View>
      </Pressable>

      <Pressable onPress={toMapScreen} className="flex-1 items-center">
        <Image 
          source={require('@assets/images/Home/MapPng.png')} 
          className="h-full w-full"  
          resizeMode="contain"
        />
        <View className="absolute bottom-6 left-4 flex items-start">
          <Text className="text-sm text-white">택시팟을</Text>
          <Text className="font-semibold text-base text-white">지도에서 찾아보세요</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MiddleComponent;
