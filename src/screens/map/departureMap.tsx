import { useRecoilState } from "recoil";
import { Text, View, Pressable } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Coord, Camera, NaverMapView, NaverMapViewRef } from "@mj-studio/react-native-naver-map";

import ButtonComponent from "@components/Button";
import TransparentSearchBoxComponent from "@components/Search/TransparentSearchBox";

import { departureState } from "@recoil/recoil";

import { useReverseGeocoding } from "@hooks/api/search";

import { calculateCenter, getCurrentLocation } from "@utils/map";

import { DepartureMapScreenProps } from "@type/param/loginStack";

import MapPin from '@assets/images/Map/MapPin.svg';
import MapPinGray from '@assets/images/Map/MapPinGray.svg';
import CurrentLocationButton from '@assets/images/Map/currentLocation.svg';
import ChevronBackwardCircle from '@assets/images/Map/chevronBackwardCircle.svg';

const DepartureMapScreen = ({ route, navigation }: DepartureMapScreenProps) => {
  const insets = useSafeAreaInsets();
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const mapRef = useRef<NaverMapViewRef>(null);
  const [searchBoxValue, setSearchBoxValue] = useState<string>("출발지를 입력하세요");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [, setDeparture] = useRecoilState(departureState);
  const [builingName, setBuildingName] = useState<string>('');

  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 16,
  });

  useEffect(() => {
    if (route.params) {
      const searchCamera: Camera = {
        latitude: route.params?.searchParams.latitude,
        longitude: route.params?.searchParams.longitude,
        zoom: 16,
      }
      mapRef.current?.animateCameraTo(searchCamera);
      setBuildingName(route.params?.searchParams.title);
    }
  }, [route.params])


  const { results, refetch } = useReverseGeocoding(
    currentCamera.latitude, 
    currentCamera.longitude
  );
  
  // 화면의 어디에서 멈추는지 snap point
  const snapPoints = useMemo(() => ['27%'], []);

  // 처음 렌더링 시 현재위치
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentCamera({
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 16,
      });
      !route.params && mapRef.current?.animateCameraTo(location);
    };
    fetchCurrentLocation();
  }, []);

  // timeout 정보 저장 Ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /** 카메라 이동시 1000ms 딜레이 주며 함수호출 */
  const handleCameraChange = useCallback((e: Camera) => {
    // timeout 시
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 조정된 센터 저장
    setCurrentCamera({
      latitude: e.latitude,
      longitude: e.longitude,
      zoom: e.zoom,
    });

    timeoutRef.current = setTimeout(() => {
      // 다시 탐색
      refetch();
      console.log(results)
    }, 100);
  }, []);

  /** 현재 위치로 */
  const moveToCurrentLocation = async() => {
    const currentLocation = await getCurrentLocation();
    setCurrentCamera({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      zoom: 16,
    });

    mapRef.current?.animateCameraTo(currentLocation);
    refetch();
  }

  /** 빌딩 이름 유무에 따른 렌더링 */
  const formatBuildingName = () => {
    if (route.params) {
      return route.params?.searchParams.title;
    }

    const value = results?.[1]?.land.addition0.value;

    if (value === undefined) {
      return "주소 정보 없음";
    } else if (value === "") {
      return "건물 정보 없음";
    } else {
      return value;
    }
  }

  /** 도로명 주소 포맷 로직 */
  const formatAddress = () => {
    const area1 = results?.[0]?.region.area1.name;
    const area2 = results?.[0]?.region.area2.name;
    const landName = results?.[1]?.land.name;
    const landNumber1 = results?.[1]?.land.number1;
    const landNumber2 = results?.[1]?.land.number2;

    let addressString = " ";

    area1 && (addressString += area1);
    area2 && (addressString += " " + area2);
    landName && (addressString += " " + landName);
    landNumber1 && (addressString += " " + landNumber1);
    landNumber2 && (addressString += "-" + landNumber2);

    return addressString.trim();
  }

  /** 출발지 저장 로직 */
  const handleSearch = () => {
    if (formatBuildingName() === "건물 정보 없음") {
      setDeparture({
        name: formatAddress(),
        longitude: currentCamera.longitude,
        latitude: currentCamera.latitude,
      });
      setIsSearched(true);
    } else if (formatBuildingName() === "주소 정보 없음") {
      setIsSearched(false);
    } else {
      setDeparture({
        name: formatBuildingName(),
        longitude: currentCamera.longitude,
        latitude: currentCamera.latitude,
      });
      setIsSearched(true);
    }
    navigation.goBack();
  }

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  }

  const toBack = () => {
    navigation.goBack();
  }

  return (
    <View className="flex-1 items-center bg-white" style={{ marginTop: 0 }}>
      <Pressable 
        className="w-full flex-1"
        onPressIn={() => setIsTouching(true)}
        onPressOut={() => setIsTouching(false)}
      >
        <NaverMapView 
          ref={mapRef}
          style={{ flex: 1 }}
          mapType="Basic"
          initialCamera={currentCamera}
          locale="ko"
          isShowLocationButton={false}
          isShowScaleBar={false}
          logoAlign="BottomLeft"
          onCameraChanged={handleCameraChange}
        />
      </Pressable>

      {/** 검색창 */}
      <View
        className="absolute w-full"
        style={{
          // safearea 기준 위치 설정
          top: insets.top + 8,
        }}
      >
        <Pressable
          onPress={toSearchScreen}
        >
          <TransparentSearchBoxComponent 
            isSearched={isSearched}
            value={searchBoxValue}
          />
        </Pressable>
      </View>

      {/** 중앙 마커 */}
      <View 
        className="absolute left-1/2 top-1/2"
      >
        {!isTouching ? (
          <View className="-translate-x-6 -translate-y-6">
            <MapPin width={48} height={48} />
          </View>
        ) : (
          <View className="-translate-x-6 -translate-y-7">
            <MapPinGray width={48} height={52} />
          </View>
        )}
      </View>

      <View className="absolute bottom-[29%] flex w-full flex-row items-center justify-between px-4">
        <Pressable 
          onPress={toBack}
          className=""
        >
          <ChevronBackwardCircle />
        </Pressable>

        <Pressable
          className="p-2"
          onPress={moveToCurrentLocation}
        >
          <CurrentLocationButton />
        </Pressable>
      </View>

      {/** 바텀시트 */}
      <BottomSheet
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
        }}
        index={0}
        snapPoints={snapPoints}
      >
        <BottomSheetView
          className="flex-1 items-center"
        >
          <View className="flex-1 flex-col px-6 py-2">

            <Text className="mb-2 font-medium text-base text-boxFont">출발지</Text>
            <Text className="text-lg font-semibold text-main">
              {formatBuildingName()}
            </Text>
            <Text className="text-gray600">
              {formatAddress()}
            </Text>

            {/** 출발지 설정 버튼 */}
            {formatBuildingName() === "주소 정보 없음" || isTouching ? (
              <Pressable
                className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-disabled2"
                disabled={true}
              >
                <Text className="font-semibold text-white">출발지로 설정</Text>
              </Pressable>
            ) : (
              <Pressable
                className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-main"
                onPress={() => handleSearch()}
              >
                <Text className="font-semibold text-white">출발지로 설정</Text>
              </Pressable>
            )}


          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default DepartureMapScreen;