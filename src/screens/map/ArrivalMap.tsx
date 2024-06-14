import { useRecoilState } from "recoil";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useRef, useMemo, useState, useEffect } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Camera, NaverMapView, NaverMapViewRef, NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map";

import SpotMarker from "@components/Marker/SpotMarker";
import TransparentSearchBoxComponent from "@components/Search/TransparentSearchBox";

import { arrivalState } from "@recoil/recoil";

import { useGetSpotMap } from "@hooks/api/spot";

import { Spot } from "@type/entity/spot";
import { ArrivalMapScreenProps } from "@type/param/loginStack";

import SpotPinSvg from "@assets/images/Map/spotPin.svg";
import SpotPinGraySvg from "@assets/images/Map/spotPinGray.svg";
import ChevronBackwardCircle from '@assets/images/Map/chevronBackwardCircle.svg';

const ArrivalMapScreen = ({ route, navigation }: ArrivalMapScreenProps) => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<NaverMapViewRef>(null);
  const [searchBoxValue, setSearchBoxValue] = useState<string>("도착지를 입력하세요");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | undefined>(route.params?.spot);
  const snapPoints = useMemo(() => ['27%'], []);

  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 14,
  });

  useEffect(() => {
    if (route.params?.type === "spot" && route.params.spot) {
      setSelectedSpot(route.params.spot);
      setCurrentCamera({
        latitude: route.params.spot?.latitude,
        longitude: route.params.spot?.longitude,
        zoom: 14,
      });
    } else if (route.params?.type === "search" && route.params.searchParams) {
      setSelectedSpot(undefined);
      setCurrentCamera({
        latitude: route.params.searchParams?.latitude,
        longitude: route.params.searchParams?.longitude,
        zoom: 14,
      });
    }
  }, []);

  useEffect(() => {
    mapRef.current?.animateCameraWithTwoCoords({
      coord1: {
        latitude: spotData.maxLatitude * 1.00005,
        longitude: spotData.maxLongitude * 1.00005,
      },
      coord2: {
        latitude: spotData.minLatitude * 0.99995,
        longitude: spotData.minLongitude * 0.99995,
      }
    })
  }, [route.params?.searchParams?.title])

  // 거점 3개와 고정카메라 좌표 리턴
  const { spotData, refetch } = useGetSpotMap({
    "count": 3,
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
  });

  const handleSelectSpot = (spot: Spot) => {
    setSelectedSpot(spot);
    console.log(spot);
  }

  useEffect(() => {
    console.log(selectedSpot)
  }, [selectedSpot])

  const toBack = () => {
    navigation.goBack();
  }

  const toSearchScreen = () => {
    navigation.navigate('ArrivalSearchScreen');
  }
  
  // 도착 거점을 저장하며 이동
  const [, setArrival] = useRecoilState(arrivalState);
  const handleSelectArrival = () => {
    navigation.navigate('CreateRoomScreen');
    if (selectedSpot) {
      setArrival({
        name: selectedSpot.name,
        spotId: selectedSpot.id,
      });
    }
  }
  
  return (
    <View className="flex-1 items-center bg-white" style={{ marginTop: 0 }}>
      <NaverMapView 
        ref={mapRef}
        style={{ flex: 1, width: "100%", padding: -40 }}
        mapType="Basic"
        initialCamera={currentCamera}
        locale="ko"
        isShowLocationButton={false}
        isShowScaleBar={false}
        isShowZoomControls={false}
        logoAlign="BottomLeft"
      >
        {spotData.spots
          .filter((spot) => spot.id === selectedSpot?.id)
          .map((spot, index) => (
            <NaverMapMarkerOverlay
              key={`selected-${spot.id}`}
              latitude={spot.latitude}
              longitude={spot.longitude}
              anchor={{ x: 0.5, y: 0.5 }}
              onTap={() => handleSelectSpot(spot)}
            >
              <SpotMarker selected={true} spotName={spot.name} />
            </NaverMapMarkerOverlay>
          ))}
        {spotData.spots
          .filter((spot) => spot.id !== selectedSpot?.id)
          .map((spot, index) => (
            <NaverMapMarkerOverlay
              key={`unselected-${spot.id}`}
              latitude={spot.latitude}
              longitude={spot.longitude}
              anchor={{ x: 0.5, y: 0.5 }}
              onTap={() => handleSelectSpot(spot)}
            >
              <SpotMarker selected={false} spotName={spot.name} />
            </NaverMapMarkerOverlay>
          ))}
      </NaverMapView>

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

      <View className="absolute bottom-[29%] flex w-full flex-row items-center justify-between px-4">
        <Pressable 
          onPress={toBack}
          className=""
        >
          <ChevronBackwardCircle />
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
            {selectedSpot ? (
              <View className="flex-1">
                <Text className="mb-2 font-medium text-base text-boxFont">도착지</Text>
                <View className="flex flex-row items-center">
                  <SpotPinSvg width={15} height={20} />
                  <Text className="ml-1 text-lg font-semibold text-main">
                    {selectedSpot.name}
                  </Text>
                </View>
                <Text className="text-gray600">
                  {selectedSpot.address}
                </Text>
                <Pressable
                  className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-main"
                  onPress={() => handleSelectArrival()}
                >
                  <Text className="font-semibold text-white">도착지로 설정</Text>
                </Pressable>
              </View>
            ) : (
              <View className="flex-1">
                <Text className="mb-2 font-medium text-base text-boxFont">근처 거점 포인트를 선택해주세요!</Text>
                <View className="flex flex-row items-center">
                  <SpotPinGraySvg width={15} height={20} />
                  <Text className="ml-1 text-lg font-semibold text-gray500">
                    거점지를 선택해주세요
                  </Text>
                </View>
                <Text className="text-sm text-gray600">
                  -
                </Text>
                <Pressable
                  className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-gray500"
                  disabled={true}
                >
                  <Text className="font-semibold text-white">도착지로 설정</Text>
                </Pressable>
              </View>
            )}

            {/** 도착지 설정 버튼 */}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
};

export default ArrivalMapScreen;