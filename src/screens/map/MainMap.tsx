import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { View, StyleSheet, Button, Text, Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  NaverMapCircleOverlay,
  NaverMapPathOverlay,
  NaverMapPolygonOverlay,
  Camera,
} from '@mj-studio/react-native-naver-map';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';

import { CheckRoomResponse } from '@server/responseTypes/room';

import RoomMarkerComponent from '@components/Marker/RoomMarker';

import MapBottomSheetScreen from './MapBottomSheet';
import {
  fetchRoomCurrentCamera,
  calculateRange,
  calculateCenter,
} from '@utils/map';

const MainMapScreen = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 화면의 어디에서 멈추는지 snap point
  const snapPoints = useMemo(() => ['40%', '90%'], []);

  // TODO: '100%' 일 때 하나의 스크린처럼 보이도록 상단 헤더 렌더링 및 기존 컴포넌트 내리기
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  // 배경 터치시 복귀
  const handleBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={-1}
        disappearsOnIndex={1}
        opacity={0}
      />
    ),
    [],
  );

  // 현재 카메라 중심좌표 저장
  const [currentCamera, setCurrentCamera] = useState<Camera>();

  // 현재 줌에서의 탐색 범위
  const [range, setRange] = useState<number>(600);

  // 현재 조회한 매칭방 배열
  const [rooms, setRooms] = useState<CheckRoomResponse[]>([]);

  // 처음 렌더링 시 현재위치 저장 및 방 탐색
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

        fetchRoomCurrentCamera(longitude, latitude, range, setRooms);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  // timeout 정보 저장 Ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /** 카메라 이동시 1000ms 딜레이 주며 함수호출 */
  const onCameraChange = useCallback((e: Camera) => {
    // timeout 시
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      let newRange = 2500;
      let adjustValue = 0.001;
      if (e.zoom) {
        adjustValue = calculateCenter(e.zoom);
        newRange = calculateRange(e.zoom);
        setRange(newRange);
      }

      // 카메라 센터를 zoom 레벨에 따라 하단으로 조정
      const adjustedLatitude = e.latitude - adjustValue;

      // 조정된 센터 저장 및 방 탐색
      setCurrentCamera({
        latitude: adjustedLatitude,
        longitude: e.longitude,
        zoom: e.zoom,
      });

      fetchRoomCurrentCamera(e.longitude, adjustedLatitude, newRange, setRooms);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   console.log(currentCamera);
  // }, [currentCamera]);

  // 렌더링
  return (
    // 지도가 화면 전체를 포함하기 위한 마진 설정
    <View className="flex-1 justify-center bg-white" style={{ marginTop: 0 }}>
      {/** 지도 */}
      <View className="flex-1 w-full h-auto mb-[320px]">
        {currentCamera && (
          <NaverMapView
            style={{ flex: 1 }}
            mapType="Basic"
            initialCamera={currentCamera}
            onCameraChanged={onCameraChange}
            locale="ko"
            logoAlign="BottomRight"
            //logoMargin={{ bottom: 40 }}
          >
            <NaverMapMarkerOverlay
              latitude={currentCamera.latitude}
              longitude={currentCamera.longitude}
            />
            <NaverMapCircleOverlay
              latitude={currentCamera.latitude}
              longitude={currentCamera.longitude}
              radius={range}
              color={'rgba(64, 206, 172, 0.24)'}
            />
            {rooms &&
              rooms.map((room) => (
                /** 매칭방 하나의 마커 */
                /** TODO :
                 * 마커 탭 했을 때의 동작 (바텀시트에 정보 출력 등)
                 */
                <NaverMapMarkerOverlay
                  key={room.id}
                  latitude={room.departureLatitude}
                  longitude={room.departureLongitude}
                  onTap={() => console.log(room.spotName)}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <RoomMarkerComponent spotName={room.spotName} />
                </NaverMapMarkerOverlay>
              ))}
          </NaverMapView>
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
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={handleBackDrop}
      >
        <BottomSheetView className="flex-1 items-center">
          <MapBottomSheetScreen />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default MainMapScreen;
