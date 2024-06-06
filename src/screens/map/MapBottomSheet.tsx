import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FilterButtonComponent from '@components/RoomDigest/FilterButton';
import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';
import SpotFilterButtonComponent from '@components/RoomDigest/SpotFilterButton';

import { RoomList } from '@type/entity/room';

import RadioButtonBoxSvg from '@assets/images/RadioBox/RadioButtonBox.svg';
import ChevronDownBoxSvg from '@assets/images/RoomDigest/ChevronDownBox.svg';
import SelectedRadioButtonSvg from '@assets/images/RadioBox/SelectedRadioButton.svg';

interface MapBottomSheetProps {
  roomList: RoomList[];
}

const MapBottomSheetScreen: React.FC<MapBottomSheetProps> = ({
  roomList
}) => {
  return (
    <View className="w-full flex-1 bg-white p-4">
      {/** 필터링 태그 선택 (가로 스크롤 적용) */}
      <View className="h-fit">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="mb-4 flex flex-row overflow-scroll">
            <SpotFilterButtonComponent label="도착지" />
            <FilterButtonComponent label="학생인증" />
            <FilterButtonComponent label="여자만" />
            <FilterButtonComponent label="매너탑승" />
            <FilterButtonComponent label="학생인증" />
          </View>
        </ScrollView>
      </View>

      {/** 마감임박 radio, 최신순 필터 */}
      <View className="mb-1 flex flex-row items-center justify-between">
        <Pressable className="flex flex-row items-center">
          <View className="p-2">
            <RadioButtonBoxSvg />
          </View>
          <Text className="font-medium text-boxFont">마감임박</Text>
        </Pressable>
        <Pressable className="flex flex-row items-center pr-1">
          <Text className="mr-1 font-medium text-boxFont">최신순</Text>
          <ChevronDownBoxSvg />
        </Pressable>
      </View>

      {/** (세로 스크롤 적용) */}
      <ScrollView className="flex-1">
        {roomList && roomList.map((room, index) => (
          <RoomDigestBoxComponent
            key={index}
            lastChatTime={3}
            departureTime={room.departureTime}
            departureName={room.departureName}
            arrivalName={room.arrivalName}
            currentHeadCount={room.currentHeadcount}
            wishHeadCount={room.wishHeadcount}
            expectedChargePerPerson={room.expectedChargePerPerson}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MapBottomSheetScreen;
