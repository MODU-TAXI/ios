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

import ChevronBackwardCircle from '@assets/images/Map/chevronBackwardCircle.svg';

const ArrivalMapScreen = ({ route, navigation }: ArrivalMapScreenProps) => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<NaverMapViewRef>(null);
  const [searchBoxValue, setSearchBoxValue] = useState<string>("출발지를 입력하세요");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | undefined>(route.params?.spot);
  const snapPoints = useMemo(() => ['27%'], []);

  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 16,
  });

  useEffect(() => {
    if (route.params?.type === "spot" && route.params.spot) {
      setSelectedSpot(route.params.spot);
      setCurrentCamera({
        latitude: route.params.spot?.latitude,
        longitude: route.params.spot?.longitude,
        zoom: 16,
      });
    } else if (route.params?.type === "search" && route.params.searchParams) {
      setSelectedSpot(undefined);
      setCurrentCamera({
        latitude: route.params.searchParams?.latitude,
        longitude: route.params.searchParams?.longitude,
        zoom: 16,
      });
    }
  }, []);

  // 거점 3개와 distance
  const { spots, refetch } = useGetSpotMap({
    "count": 3,
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
  });

  const handleCameraChange = () => {
    setSelectedSpot(undefined);
  }

  const toBack = () => {
    navigation.goBack();
  }

  const toSearchScreen = () => {
    navigation.navigate('ArrivalSearchScreen');
  }
  
  // 도착 거점을 저장하며 이동
  const [, setArrival] = useRecoilState(arrivalState);
  const handleSelectSpot = () => {
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
        style={{ flex: 1, width: "100%" }}
        mapType="Basic"
        initialCamera={currentCamera}
        locale="ko"
        isShowLocationButton={false}
        isShowScaleBar={false}
        isShowZoomControls={false}
        logoAlign="BottomLeft"
        onCameraChanged={handleCameraChange}
      >
        <NaverMapMarkerOverlay
          latitude={currentCamera.latitude}
          longitude={currentCamera.longitude}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <SpotMarker selected={false} spotName="주안역" />
        </NaverMapMarkerOverlay>
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
            {/** 도착지 설정 버튼 */}
            <Pressable
              className="mb-2 mt-4 flex h-[56px] w-full items-center justify-center rounded-full bg-main"
              onPress={() => handleSelectSpot}
            >
              <Text className="font-semibold text-white">도착지로 설정</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
};

export default ArrivalMapScreen;