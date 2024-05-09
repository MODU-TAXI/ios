import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FilterButtonComponent from '@components/RoomDigest/FilterButton';
import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';
import SpotFilterButtonComponent from '@components/RoomDigest/SpotFilterButton';

import RadioButtonBoxSvg from '@assets/images/RadioBox/RadioButtonBox.svg';
import ChevronDownBoxSvg from '@assets/images/RoomDigest/ChevronDownBox.svg';
import SelectedRadioButtonSvg from '@assets/images/RadioBox/SelectedRadioButton.svg';


const MapBottomSheetScreen = () => {
  return (
    <View className="flex-1 p-4 w-full bg-white">
      {/** 필터링 태그 선택 (가로 스크롤 적용) */}
      <View className="h-fit">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row mb-4 overflow-scroll">
            <SpotFilterButtonComponent label="도착지" />
            <FilterButtonComponent label="학생인증" />
            <FilterButtonComponent label="여자만" />
            <FilterButtonComponent label="매너탑승" />
            <FilterButtonComponent label="학생인증" />
          </View>
        </ScrollView>
      </View>

      {/** 마감임박 radio, 최신순 필터 */}
      <View className="flex flex-row mb-1 justify-between items-center">
        <Pressable className="flex flex-row items-center">
          <View className="p-2">
            <RadioButtonBoxSvg />
          </View>
          <Text className="text-boxFont font-medium">마감임박</Text>
        </Pressable>
        <Pressable className="flex flex-row items-center pr-1">
          <Text className="text-boxFont font-medium mr-1">최신순</Text>
          <ChevronDownBoxSvg />
        </Pressable>
      </View>

      {/** (세로 스크롤 적용) */}
      <ScrollView className="flex-1">
        <RoomDigestBoxComponent
          lastChatTime={3}
          departureTime={'14:25'}
          departureName={'인하대학교 후문'}
          arrivalName={'주안역'}
          currentHeadCount={2}
          wishHeadCount={3}
          expectedChargePerPerson={8300}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          departureTime={'14:25'}
          departureName={'인하대학교 후문'}
          arrivalName={'주안역'}
          currentHeadCount={2}
          wishHeadCount={3}
          expectedChargePerPerson={8300}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          departureTime={'14:25'}
          departureName={'인하대학교 후문'}
          arrivalName={'주안역'}
          currentHeadCount={2}
          wishHeadCount={3}
          expectedChargePerPerson={8300}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          departureTime={'14:25'}
          departureName={'인하대학교 후문'}
          arrivalName={'주안역'}
          currentHeadCount={2}
          wishHeadCount={3}
          expectedChargePerPerson={8300}
        />
        <RoomDigestBoxComponent
          lastChatTime={3}
          departureTime={'14:25'}
          departureName={'인하대학교 후문'}
          arrivalName={'주안역'}
          currentHeadCount={2}
          wishHeadCount={3}
          expectedChargePerPerson={8300}
        />
      </ScrollView>
    </View>
  );
};

export default MapBottomSheetScreen;
