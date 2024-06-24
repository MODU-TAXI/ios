import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Coord } from '@mj-studio/react-native-naver-map';
import { SafeAreaView } from 'react-native-safe-area-context';

import SpotSearchComponent from '@components/Search/SpotSearch';
import ArrivalSearchBoxComponent from '@components/Search/ArrivalSearchBox';
import RecommendedSearchComponent from '@components/Search/RecommendedSearch';
import EmptySearchRenderComponent from '@components/Search/EmptySearchRender';

import { arrivalState, searchKeywordState } from '@recoil/recoil';

import { useGetSpotList } from '@hooks/api/spot';
import { useNaverSearch } from '@hooks/api/search';

import { calculateDist, deleteTagTitle } from '@utils/search';
import { convertCoordinates, getCurrentLocation } from '@utils/map';

import { Spot } from '@type/entity/spot';
import { SortedItemType } from '@type/entity/search';
import { ArrivalSearchScreenProps } from '@type/param/loginStack';


/** 도착 거점 검색 */
const ArrivalSearchScreen = ({ navigation }: ArrivalSearchScreenProps) => {
  /** 검색어 저장 변수 */
  const [keyword, ] = useRecoilState<string>(searchKeywordState);
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

  const [spotSearchParams, setSpotSearchParams] = useState({
    currentLongitude: currentLocation.longitude,
    currentLatitude: currentLocation.latitude,
    departureLongitude: currentLocation.longitude,
    departureLatitude: currentLocation.latitude,
  });

  // sortedItems 바뀔 때마다 거점탐색의 파라미터 변경
  useEffect(() => {
    if (sortedItems.length > 0) {
      setSpotSearchParams({
        currentLongitude: currentLocation.longitude,
        currentLatitude: currentLocation.latitude,
        departureLongitude: sortedItems[0].longitude,
        departureLatitude: sortedItems[0].latitude,
      })
    }
  }, [sortedItems])

  const { spots, refetch: refetchSpotList } = useGetSpotList(
    1, 1, 
    spotSearchParams?.currentLongitude,
    spotSearchParams?.currentLatitude,
    spotSearchParams?.departureLongitude,
    spotSearchParams?.departureLatitude,
  );

  /** 검색어 선택: 선택한 검색어를 전달하며 이동 */
  const toArrivalMapScreen = (
    title: string,
    latitude: number,
    longitude: number,
  ) => {
    navigation.navigate('ArrivalMapScreen', {
      type: 'search',
      searchParams: {
        title: title,
        latitude: latitude,
        longitude: longitude,
      }
    });
  }

  /** 거점 선택: 거점 정보 가져가며 이동 */
  const toArrivalMapScreenWithSpot = (spot: Spot) => {
    navigation.navigate('ArrivalMapScreen', {
      type: 'spot',
      spot: spot,
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 flex-1">
        
        {/** 검색창 */}
        <View className="mb-3 mt-2">
          <ArrivalSearchBoxComponent />
        </View>

        {keyword && (
          <Pressable onPress={() => toArrivalMapScreenWithSpot(spots[0])}>
            <SpotSearchComponent spotName={spots[0].name} />
          </Pressable>
        )}

        {/** 추천 검색어 */}
        {sortedItems && 
          sortedItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => toArrivalMapScreen(
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
                isFirst={false}
              />
            </Pressable>
        ))}

        {/** 빈 화면 렌더링 */}
        {sortedItems.length === 0 && !keyword &&
          <EmptySearchRenderComponent />
        }
      </View>
    </SafeAreaView>
  );
};

export default ArrivalSearchScreen;
