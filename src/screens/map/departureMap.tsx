import { Text, View, Pressable } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Camera, NaverMapView } from "@mj-studio/react-native-naver-map";

import TransparentSearchBoxComponent from "@components/Search/TransparentSearchBox";

import { DepartureMapScreenProps } from "@type/param/loginStack";

import MapPin from '@assets/images/Map/MapPin.svg';
import MapPinGray from '@assets/images/Map/MapPinGray.svg';

const DepartureMapScreen = ({ navigation }: DepartureMapScreenProps) => {
  const insets = useSafeAreaInsets();
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 14,
  });
  // 화면의 어디에서 멈추는지 snap point
  const snapPoints = useMemo(() => ['25%'], []);

  // 처음 렌더링 시 현재위치
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const adjustedLatitude = latitude - 0.01;
        setCurrentCamera({
          latitude: adjustedLatitude,
          longitude: longitude,
          zoom: 14,
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  }

  return (
    <View className="flex-1 items-center bg-white" style={{ marginTop: 0 }}>
      <Pressable 
        className="w-full flex-1"
        onPressIn={() => setIsTouching(true)}
        onPressOut={() => setIsTouching(false)}
      >
        <NaverMapView 
          style={{ flex: 1 }}
          mapType="Basic"
          initialCamera={currentCamera}
          locale="ko"
          isShowLocationButton={false}
          isShowScaleBar={false}
          logoAlign="BottomLeft"
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
          <TransparentSearchBoxComponent />
        </Pressable>
      </View>

      {/** 중앙 마커 */}
      <View 
        className="absolute left-1/2 top-[42%]"
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
            <Text className="text-lg font-semibold text-main">주안역</Text>
            <Text className="text-gray600">인천 미추홀구 주안로 95-19</Text>
            <Pressable
              className="mt-4 flex w-full items-center justify-center rounded-full bg-main"
            >
              <Text className="py-[15.5px] font-semibold text-white">출발지로 설정</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default DepartureMapScreen;