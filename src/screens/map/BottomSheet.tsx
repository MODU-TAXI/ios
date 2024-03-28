import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text } from 'react-native';

const BottomSheetScreen = () => {
  return (
    <View className="flex-1 p-4 w-full">
      <Text>ddd</Text>

      <BottomSheetScrollView className="flex-1">
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="언제언제출발"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="언제언제출발"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="언제언제출발"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="언제언제출발"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="언제언제출발"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
      </BottomSheetScrollView>
    </View>
  );
};

export default BottomSheetScreen;
