import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FilterButtonComponent from '@components/RoomDigest/FilterButton';
import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';
import SpotFilterButtonComponent from '@components/RoomDigest/SpotFilterButton';

import { userInfoState } from '@recoil/recoil';

import { SpotMap } from '@type/entity/spot';
import { MainMapScreenProps } from '@type/param/loginStack';
import { RoomList, RoomIntegration, RoomFilterParam } from '@type/entity/room';

import RadioButtonBoxSvg from '@assets/images/RadioBox/RadioButtonBox.svg';
import ChevronDownBoxSvg from '@assets/images/RoomDigest/ChevronDownBox.svg';
import SelectedRadioButtonSvg from '@assets/images/RadioBox/SelectedRadioButton.svg';


interface MapBottomSheetProps {
  roomList: RoomIntegration[];
  navigation: MainMapScreenProps['navigation'];
  index: number;
  handleModal: () => void;
  handleFilter: (category: string, value: any) => void;
  filterParam: RoomFilterParam;
  spotData: SpotMap;
}

const MapBottomSheetScreen: React.FC<MapBottomSheetProps> = ({
  roomList,
  navigation,
  index,
  handleModal,
  handleFilter,
  filterParam,
  spotData,
}) => {
  const userInfo = useRecoilValue(userInfoState);

  // 선택된 거점 이름 저장
  const [selectedSpotName, setSelectedSpotName] = useState<string>('');
  useEffect(() => {
    if (filterParam.spotId) {
      setSelectedSpotName(spotData.spots.find((spot) => spot.id === filterParam.spotId)?.name || '');
    }
  }, [filterParam.spotId])

  /** 거점 선택 취소 */
  const deleteSpotFilter = () => {
    handleFilter("spotId", 0);
  }

  /** 해당 마커의 room 으로 이동 */
  const toRoomDetailScreen = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', {roomId: roomId});
  };

  return (
    <View className={`w-full flex-1 p-4 ${index === 2 ? "pb-[500px]" : "pb-40"}`}>
      {/** 필터링 태그 선택 (가로 스크롤 적용) */}
      <View className="h-fit">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="mb-4 flex flex-row overflow-scroll">

            {/** 거점 필터 */}
            {filterParam.spotId && spotData.spots.find((spot) => spot.id === filterParam.spotId)?.name ? (
              <Pressable onPress={handleModal}>
                <SpotFilterButtonComponent 
                  selected={true}
                  label={selectedSpotName} 
                  handleDelete={deleteSpotFilter}
                />
              </Pressable>
            ) : (
              <Pressable onPress={handleModal}>
                <SpotFilterButtonComponent selected={false} label="거점지" />
              </Pressable>
            )}

            
            <FilterButtonComponent label="학생인증" />

            {userInfo.gender === "MALE" ? (
              <FilterButtonComponent label="남자만" />
            ) : (
              <FilterButtonComponent label="여자만" />
            )}

            <FilterButtonComponent label="조용히" />
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
          <Pressable key={index} onPress={() => toRoomDetailScreen(room.roomId)}>
            <RoomDigestBoxComponent
              roomTagBitMaskList={room.roomTagBitMaskList}
              lastChatTime={3}
              departureTime={room.departureTime}
              departureName={room.departureName}
              arrivalName={room.arrivalName}
              currentHeadCount={room.currentHeadcount}
              wishHeadCount={room.wishHeadcount}
              expectedChargePerPerson={room.expectedChargePerPerson}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default MapBottomSheetScreen;
