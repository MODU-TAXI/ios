import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text } from 'react-native';

const BottomSheetScreen = () => {
  return (
    <View className="flex-1 p-4 w-full">
      <Text>ddd</Text>

      <BottomSheetScrollView className="flex-1">
        <View className="flex-1 w-full h-[2000px] bg-slate-500"></View>
      </BottomSheetScrollView>
    </View>
  );
};

export default BottomSheetScreen;
