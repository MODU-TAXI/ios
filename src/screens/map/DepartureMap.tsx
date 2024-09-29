import { useRecoilState } from 'recoil';
import { Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Camera, NaverMapView, NaverMapViewRef } from '@mj-studio/react-native-naver-map';

import TransparentSearchBoxComponent from '@components/Search/TransparentSearchBox';

import { departureRecoilState } from '@recoil/states/map';
import { searchParamRecoilState } from '@recoil/states/search';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useReverseGeocoding } from '@hooks/api/search';
import { useLocationPermission } from '@hooks/permission/location';

import { getCurrentLocation } from '@utils/map';

import { DepartureMapScreenProps } from '@type/param/loginStack';

import MapPin from '@assets/images/Map/MapPin.svg';
import MapPinGray from '@assets/images/Map/MapPinGray.svg';
import CurrentLocationButton from '@assets/images/Map/currentLocation.svg';
import ChevronBackwardCircle from '@assets/images/Map/chevronBackwardCircle.svg';

const DepartureMapScreen = ({ route, navigation }: DepartureMapScreenProps) => {
  useDeleteAllNotifee();

  const insets = useSafeAreaInsets();
  const mapRef = useRef<NaverMapViewRef>(null);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [searchBoxValue, setSearchBoxValue] = useState<string>('출발지를 입력하세요');
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const [, setDepartureRecoil] = useRecoilState(departureRecoilState);
  const [searchParamRecoil, setSearchParamRecoil] = useRecoilState(searchParamRecoilState);
  const [buildingName, setBuildingName] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 16,
  });

  // reverse geocoding
  const { results, refetch, isFetching } = useReverseGeocoding(
    currentCamera.latitude,
    currentCamera.longitude,
  );

  // 화면의 어디에서 멈추는지 snap point
  const snapPoints = useMemo(() => ['27%'], []);

  // 위치 권한 정보
  const locationPermission = useLocationPermission();

  // 처음 렌더링 시 카메라 제어
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentCamera({
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 16,
      });
      mapRef.current?.animateCameraTo(location);
    };

    const fetchSearchLocation = () => {
      const searchLocation: Camera = {
        latitude: searchParamRecoil.latitude,
        longitude: searchParamRecoil.longitude,
        zoom: 16,
      };
      setCurrentCamera(searchLocation);
      setBuildingName(searchParamRecoil.title);
      mapRef.current?.animateCameraTo(searchLocation);
    };

    const fetchRoomDetailLocation = () => {
      if (route.params?.roomDetail) {
        const roomDetail = route.params?.roomDetail;
        const roomLocation: Camera = {
          latitude: roomDetail?.departureLatitude,
          longitude: roomDetail?.departureLongitude,
          zoom: 16,
        };
        setCurrentCamera(roomLocation);
        setBuildingName(roomDetail?.departureName);
        mapRef.current?.animateCameraTo(roomLocation);
      }
    };

    if (
      locationPermission === 'granted' &&
      searchParamRecoil.title === '' &&
      !route.params?.roomDetail
    ) {
      fetchCurrentLocation();
    } else if (searchParamRecoil.title !== '') {
      fetchSearchLocation();
      setSearchBoxValue(searchParamRecoil.title);
      setIsSearched(true);
    } else if (route.params?.roomDetail) {
      fetchRoomDetailLocation();
      setSearchBoxValue(route.params?.roomDetail.departureName);
      setIsSearched(true);
    }
  }, [locationPermission, searchParamRecoil.latitude, searchParamRecoil.longitude, route.params]);

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
    }, 100);
  }, []);

  useEffect(() => {
    formatBuildingName();
  }, [refetch, results]);

  // 카메라 옮기면 500ms간 버튼 비활성화
  useEffect(() => {
    if (isTouching) {
      setIsBlocked(true);
      setSearchParamRecoil({
        ...searchParamRecoil,
        title: '',
      });
    } else {
      const timeout = setTimeout(() => {
        setIsBlocked(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isTouching]);

  /** 현재 위치로, 1000ms간 버튼 비활성화 */
  const moveToCurrentLocation = async () => {
    setIsBlocked(true);
    const currentLocation = await getCurrentLocation();
    setCurrentCamera({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      zoom: 16,
    });

    mapRef.current?.animateCameraTo(currentLocation);
    const timeout = setTimeout(() => {
      setIsBlocked(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  /** 빌딩 이름 유무에 따른 렌더링 */
  const formatBuildingName = () => {
    if (searchParamRecoil.title !== '') {
      setBuildingName(searchParamRecoil.title);
      return;
    }

    const value = results?.[1]?.land.addition0.value;

    if (value === undefined) {
      setBuildingName('주소 정보 없음');
    } else if (value === '') {
      setBuildingName('건물 정보 없음');
    } else {
      setBuildingName(value);
    }
  };

  /** 도로명 주소 포맷 로직 */
  const formatAddress = () => {
    const area1 = results?.[0]?.region.area1.name;
    const area2 = results?.[0]?.region.area2.name;
    const area3 = results?.[0]?.region.area3.name;
    const landName = results?.[1]?.land.name;
    const landNumber1 = results?.[1]?.land.number1;
    const landNumber2 = results?.[1]?.land.number2;

    let addressString = ' ';

    area1 && (addressString += area1);
    area2 && (addressString += ' ' + area2);
    if (results?.length === 1) {
      area3 && (addressString += ' ' + area3);
    }
    landName && (addressString += ' ' + landName);
    landNumber1 && (addressString += ' ' + landNumber1);
    landNumber2 && (addressString += '-' + landNumber2);

    return addressString.trim();
  };

  /** 출발지 저장 로직 */
  const handleSearch = () => {
    if (buildingName === '건물 정보 없음') {
      setDepartureRecoil({
        name: formatAddress(),
        longitude: currentCamera.longitude,
        latitude: currentCamera.latitude,
      });
      setIsSearched(true);
    } else if (buildingName === '주소 정보 없음') {
      setIsSearched(false);
    } else {
      setDepartureRecoil({
        name: buildingName,
        longitude: currentCamera.longitude,
        latitude: currentCamera.latitude,
      });
      setIsSearched(true);
    }
    navigation.goBack();
  };

  const toSearchScreen = () => {
    navigation.navigate('DepartureSearchScreen');
  };

  const toBack = () => {
    navigation.goBack();
  };

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
          isShowZoomControls={false}
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
        <Pressable onPress={toSearchScreen}>
          <TransparentSearchBoxComponent isSearched={isSearched} value={searchBoxValue} />
        </Pressable>
      </View>

      {/** 중앙 마커 */}
      <View className="absolute left-1/2 top-1/2">
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
        <Pressable onPress={toBack} className="">
          <ChevronBackwardCircle />
        </Pressable>

        <Pressable className="p-2" onPress={moveToCurrentLocation}>
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
        <BottomSheetView className="flex-1 items-center">
          <View className="flex-1 flex-col px-6 py-2">
            <Text className="mb-2 font-medium text-base text-boxFont">출발지</Text>
            <Text className="text-lg font-semibold text-main">{buildingName}</Text>
            <Text className="text-gray600">{formatAddress()}</Text>

            {/** 출발지 설정 버튼 */}
            {buildingName === '주소 정보 없음' || isTouching || isFetching || isBlocked ? (
              <Pressable
                className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-disabled2"
                disabled={true}
              >
                <Text className="font-semibold text-white">출발지로 설정할 수 없어요.</Text>
              </Pressable>
            ) : (
              <Pressable
                className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-main"
                onPress={() => handleSearch()}
              >
                <Text className="font-semibold text-white">출발지로 설정!</Text>
              </Pressable>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default DepartureMapScreen;
