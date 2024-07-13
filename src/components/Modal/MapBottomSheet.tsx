import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Modal, Pressable } from 'react-native';

import DropDownModal from './DropDownModal';

import FilterButtonComponent from '@components/RoomDigest/FilterButton';
import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';
import SpotFilterButtonComponent from '@components/RoomDigest/SpotFilterButton';

import { userInfoState } from '@recoil/recoil';

import { SpotMap } from '@type/entity/spot';
import { MainMapScreenProps } from '@type/param/loginStack';
import { RoomList, RoomIntegration, RoomFilterParam } from '@type/entity/room';

import RadioButtonBoxSvg from '@assets/images/RadioBox/RadioButtonBox.svg';
import ChevronDownBoxSvg from '@assets/images/RoomDigest/ChevronDownBox.svg';
import SelectedRadioButtonSvg from '@assets/images/RadioBox/SelectedRadioButtonGray.svg';


interface MapBottomSheetProps {
  roomList: RoomIntegration[];
  navigation: MainMapScreenProps['navigation'];
  index: number;
  handleModal: () => void;
  handleFilter: (category: string, value: any) => void;
  filterParam: RoomFilterParam;
  spotData: SpotMap;
  refetch: () => void;
}

const MapBottomSheetScreen: React.FC<MapBottomSheetProps> = ({
  roomList,
  navigation,
  index,
  handleModal,
  handleFilter,
  filterParam,
  spotData,
  refetch
}) => {
  const userInfo = useRecoilValue(userInfoState);

  // 선택된 거점 이름 저장
  const [selectedSpotName, setSelectedSpotName] = useState<string>('');
  useEffect(() => {
    if (filterParam.spotId) {
      setSelectedSpotName(spotData.spots.find((spot) => spot.id === filterParam.spotId)?.name || '');
    }
  }, [filterParam.spotId, spotData.spots])

  /** 거점 선택 취소 */
  const deleteSpotFilter = () => {
    handleFilter("spotId", 0);
  }

  /** roomTags가 배열을 받을 상황이라면.. */
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useEffect(() => {
    if (filterParam.roomTags) {
      handleFilter("roomTags", selectedTags);
    }
    refetch();
  }, [selectedTags])

  /** 태그 선택 핸들링 */
  const handleRoomTagFilter = (tag: string) => {
    if (selectedTags.find((selectedTag) => selectedTag === tag)) {
      const newRoomTags = [...selectedTags]
      const temp = newRoomTags.findIndex((roomTag) => roomTag === tag)
      newRoomTags.splice(temp, 1);
      setSelectedTags(newRoomTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  // 태그 선택
  // const [selectedTag, setSelectedTag] = useState<string>();
  // useEffect(() => {
  //   handleFilter("roomTags", selectedTag);
  //   refetch();
  // }, [selectedTag])

  // const handleRoomTagFilter = (tag: string) => {
  //   if (tag === filterParam.roomTags) {
  //     setSelectedTag('');
  //   } else {
  //     setSelectedTag(tag);
  //   }
  // }

  // 드롭다운 모달, sortType 핸들링 상태관리
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedSortType, setSelectedSortType] = useState<string>("최신순");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  /** 선택한 sortType 적용, 모달 핸들링 */
  const handleSelectSortType = (param: string, label: string) => {
    setSelectedSortType(label);
    handleFilter("sortType", param);
    toggleModal();
  }

  const handleIsImminent = () => {
    const isImminent = !filterParam.isImminent;
    handleFilter("isImminent", isImminent);
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

            {/** 카테고리 필터 */}
            <Pressable onPress={() => handleRoomTagFilter("STUDENT_CERTIFICATION")}>
              <FilterButtonComponent 
                label="학생인증" 
                selected={selectedTags.find((tag) => tag === "STUDENT_CERTIFICATION") !== undefined} 
              />
            </Pressable>

            {userInfo.gender === "MALE" ? (
              <Pressable onPress={() => handleRoomTagFilter("ONLY_MAN")}>
                <FilterButtonComponent 
                  label="남자만" 
                  selected={selectedTags.find((tag) => tag === "ONLY_MAN") !== undefined} 
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => handleRoomTagFilter("ONLY_WOMAN")}>
                <FilterButtonComponent 
                  label="여자만" 
                  selected={selectedTags.find((tag) => tag === "ONLY_WOMAN") !== undefined} 
                />
              </Pressable>           
            )}

            <Pressable onPress={() => handleRoomTagFilter("QUIET")}>
              <FilterButtonComponent 
                label="조용히" 
                selected={selectedTags.find((tag) => tag === "QUIET") !== undefined} 
              />
            </Pressable>

            <Pressable onPress={() => handleRoomTagFilter("MANNER")}>
              <FilterButtonComponent 
                label="매너탑승" 
                selected={selectedTags.find((tag) => tag === "MANNER") !== undefined} 
              />
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <View className="mb-1 flex flex-row items-center justify-between">

        {/** 마감임박 radio */}
        <Pressable className="flex flex-row items-center" onPress={handleIsImminent}>
          <View className="p-2">
            {filterParam.isImminent ? <SelectedRadioButtonSvg width={16} height={16} /> : <RadioButtonBoxSvg width={16} height={16} />}
          </View>
          <Text className="font-medium text-boxFont">마감임박</Text>
        </Pressable>
        
        {/** 최신순/거리순/마감순 필터 */}
        <Pressable className="flex flex-row items-center pr-1" onPress={toggleModal}>
          <Text className="mr-1 font-medium text-boxFont">{selectedSortType}</Text>
          <ChevronDownBoxSvg />
          {/** 드롭다운 */}
          <Modal visible={modalVisible} animationType="fade" transparent>
            <View
              className="relative m-4 items-end justify-center"
              style={index === 2 ? {top: "60%"} : {top: "25%"}}
            >
              <DropDownModal handleSelectSortType={handleSelectSortType} selectedSortType={selectedSortType} />
            </View>
          </Modal>
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
