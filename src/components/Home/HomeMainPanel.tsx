import React from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';

interface HomeMainPanelComponentProps {
  toMapScreen: () => void;
  toCreateRoomScreen: () => void;
}

const HomeMainPanelComponent: React.FC<HomeMainPanelComponentProps> = ({ toMapScreen, toCreateRoomScreen }) => {
  const screenWidth = Dimensions.get('screen').width;
  const imgWidth = (screenWidth - 32 - 16) / 2;

  return (
    <View className="mt-4 h-auto flex-row justify-evenly px-4">
      <Pressable onPress={toCreateRoomScreen} className="mr-4 flex-1 items-center shadow-sm">
        <Image 
          source={require('@assets/images/Home/RoadPng.png')} 
          style={{ width: imgWidth, height: imgWidth }}
          resizeMode="contain"
        />
        <View className="absolute bottom-2.5 left-3 flex items-start">
          <Text className="text-sm text-white">지금 당장 함께할</Text>
          <Text className="font-semibold text-base text-white">택시팟 만들기</Text>
        </View>
      </Pressable>

      <Pressable onPress={toMapScreen} className="flex-1 items-center shadow-sm">
        <Image 
          source={require('@assets/images/Home/MapPng.png')} 
          style={{ width: imgWidth, height: imgWidth }}
          resizeMode="contain"
        />
        <View className="absolute bottom-2.5 left-3 flex items-start">
          <Text className="text-sm text-white">택시팟을</Text>
          <Text className="font-semibold text-base text-white">지도에서 찾아보세요</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default HomeMainPanelComponent;
