import FilterButtonComponent from '@components/RoomDigest/FilterButton';
import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';
import SearchLocationButtonComponent from '@components/RoomDigest/SearchLocationButton';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import RadioButtonSvg from '@assets/images/RadioBox/RadioButton.svg';
import SelectedRadioButtonSvg from '@assets/images/RadioBox/SelectedRadioButton.svg';
import ChevronDownSvg from '@assets/images/RoomDigest/ChevronDown.svg';

const MapBottomSheetScreen = () => {
  return (
    <View className="flex-1 p-4 w-full">
      {/** 필터링 태그 선택 (가로 스크롤 적용) */}
      <View className="h-fit">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row mb-4 overflow-scroll">
            <SearchLocationButtonComponent label="도착지" />
            <FilterButtonComponent label="학생인증" />
            <FilterButtonComponent label="여자만" />
            <FilterButtonComponent label="매너탑승" />
            <FilterButtonComponent label="학생인증" />
          </View>
        </ScrollView>
      </View>
      {/** 마감임박 radio, 최신순 필터 */}
      <View className="flex flex-row mb-1 justify-between items-center">
        <View className="flex flex-row items-center">
          <View className="p-2">
            <RadioButtonSvg />
          </View>
          <Text className="text-gray500">마감임박</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="pr-1 text-gray700">최신순</Text>
          <ChevronDownSvg />
        </View>
      </View>
      {/** (세로 스크롤 적용) */}
      <BottomSheetScrollView className="flex-1">
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="몇월며칠몇시"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="몇월며칠몇시"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="몇월며칠몇시"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="몇월며칠몇시"
          start="인하대학교 후문"
          destination="주안역"
          currCount={2}
          maxCount={3}
          expense={13200}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          ETD="몇월며칠몇시"
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

export default MapBottomSheetScreen;
