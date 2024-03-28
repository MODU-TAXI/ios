import RoomDigestBoxComponent from '@components/RoomDigestBox';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text } from 'react-native';

const BottomSheetScreen = () => {
  return (
    <View className="flex-1 p-4 w-full">
      <Text>ddd</Text>

      <BottomSheetScrollView className="flex-1">
        <RoomDigestBoxComponent></RoomDigestBoxComponent>
        <RoomDigestBoxComponent></RoomDigestBoxComponent>
        <RoomDigestBoxComponent></RoomDigestBoxComponent>
        <RoomDigestBoxComponent></RoomDigestBoxComponent>
        <RoomDigestBoxComponent></RoomDigestBoxComponent>
        <RoomDigestBoxComponent></RoomDigestBoxComponent>
      </BottomSheetScrollView>
    </View>
  );
};

export default BottomSheetScreen;
