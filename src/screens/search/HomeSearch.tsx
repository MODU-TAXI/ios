import { useRecoilState } from 'recoil';
import { View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Coord } from '@mj-studio/react-native-naver-map';
import { SafeAreaView } from 'react-native-safe-area-context';

import { convertCoordinates, getCurrentLocation } from '../../utils/map';

import SearchBoxComponent from '@components/Search/SearchBox';
import RecommendedSearchComponent from '@components/Search/RecommendedSearch';
import EmptySearchRenderComponent from '@components/Search/EmptySearchRender';

import { searchParamState, searchKeywordState } from '@recoil/recoil';

import { useNaverSearch } from '@hooks/api/search';

import { calculateDist, deleteTagTitle } from '@utils/search';

import { SortedItemType } from '@type/entity/search';
import { HomeSearchScreenProps } from '@type/param/loginStack';

/** 메인맵 도착지 검색 */
const HomeSearchScreen = ({ navigation }: HomeSearchScreenProps) => {
  /** 검색어 저장 변수 */
  const [keyword, setKeyword] = useRecoilState<string>(searchKeywordState);
  const { data: items, refetch: refetchNaverSearch } = useNaverSearch(keyword);
  const [sortedItems, setSortedItems] = useState<SortedItemType[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Coord>({
    latitude: 37.5665,
    longitude: 126.978,
  });
  
  // 검색어 선택시 넘겨줄 값
  const [, setSearchParam] = useRecoilState(searchParamState);

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
  const toMainMapScreen = (
    title: string,
    latitude: number,
    longitude: number,
  ) => {
    setSearchParam({
      title: title,
      latitude: latitude,
      longitude: longitude,
    })
    setKeyword(''); // 검색어 삭제
    navigation.navigate('MainMapScreen');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 flex-1">
        
        {/** 검색창 */}
        <View className="mb-3 mt-2">
          <SearchBoxComponent />
        </View>

        {/** 추천 검색어 */}
        {sortedItems && 
          sortedItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => toMainMapScreen(
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
                isFirst={index === 0}
              />
            </Pressable>
        ))}

        {sortedItems.length === 0 && !keyword && 
          <EmptySearchRenderComponent />
        }
      </View>
    </SafeAreaView>
  );
};

export default HomeSearchScreen;
