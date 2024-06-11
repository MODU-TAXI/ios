import { useRecoilState } from 'recoil';
import { View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Coord } from '@mj-studio/react-native-naver-map';
import { SafeAreaView } from 'react-native-safe-area-context';

import { convertCoordinates, getCurrentLocation } from '../../utils/map';

import SearchBoxComponent from '@components/Search/SearchBox';
import SpotSearchComponent from '@components/Search/SpotSearch';
import RecommendedSearchComponent from '@components/Search/RecommendedSearch';

import { arrivalState, searchKeywordState } from '@recoil/recoil';

import { useGetSpotList } from '@hooks/api/spot';
import { useNaverSearch } from '@hooks/api/search';

import { calculateDist, deleteTagTitle } from '@utils/search';

import { Spot } from '@type/entity/spot';
import { NaverSearch, SortedItemType } from '@type/entity/search';
import { SearchScreenProps, DepartureSearchScreenProps } from '@type/param/loginStack';

/** 출발지 검색: 거점검색 기능 제외 */
const DepartureSearchScreen = ({ navigation }: DepartureSearchScreenProps) => {
  /** 검색어 저장 변수 */
  const [keyword, setKeyword] = useRecoilState<string>(searchKeywordState);
  const { data: items, refetch: refetchNaverSearch } = useNaverSearch(keyword);
  const [sortedItems, setSortedItems] = useState<SortedItemType[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Coord>({
    latitude: 37.5665,
    longitude: 126.978,
  });

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    };
    fetchCurrentLocation();
  }, [])

  // 검색어에 따른 처리
  useEffect(() => {
    if (keyword === "") {
      setSortedItems([]);
    }
    refetchNaverSearch();
  }, [keyword, refetchNaverSearch])

  // 좌표계 변환, 두 지점 사이 거리 계산하여 새 배열에 저장
  useEffect(() => {
    if (items && items.length > 0) {
      const updatedItems = items?.map((item) => {
        const { latitude, longitude } = convertCoordinates(item.mapx, item.mapy);
        const distance = calculateDist(currentLocation.latitude, currentLocation.longitude, latitude, longitude);
        return { ...item, latitude: latitude, longitude: longitude, distance: distance };
      })
      // 정렬하여 sortedItems에 저장
      updatedItems?.sort((a, b) => a.distance - b.distance);
      setSortedItems(updatedItems);
    }
  }, [items, currentLocation])

  /** 선택한 검색어를 전달하며 이동 */
  const toDepartureMapScreen = (
    title: string,
    latitude: number,
    longitude: number,
  ) => {
    navigation.navigate('DepartureMapScreen', {searchParams: {
      title: title,
      latitude: latitude,
      longitude: longitude,
    }});
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 flex-1">
        
        {/** 검색창 */}
        <View className="mb-3 mt-2">
          <SearchBoxComponent />
        </View>

        {/** 추천 검색어 */}
        <View className="flex-1">
          {sortedItems && 
          sortedItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => toDepartureMapScreen(
                deleteTagTitle(item.title),
                item.latitude,
                item.longitude,
              )}
            >
              <RecommendedSearchComponent 
                key={index}
                keyword={keyword}
                fullKeyword={deleteTagTitle(item.title)}
                address={item.address} 
                distance={item.distance}
                isFirst={index===0}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DepartureSearchScreen;
