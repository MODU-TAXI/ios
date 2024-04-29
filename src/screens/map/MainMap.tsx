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

import { searchRoomCurrentCamera } from '@utils/map';
import { RoomResponse } from '@server/responseTypes/map';

import RoomMarkerComponent from '@components/Marker/RoomMarker';

import MapBottomSheetScreen from './MapBottomSheet';

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

  /** TODO
   * initialCamera 는 현재위치
   * 최초 렌더링 시 initialCamera 중심 방 탐색
   * camera, zoom 바뀔 때마다 재탐색 (1000ms 딜레이)
   */

  // 현재 카메라 중심좌표 저장
  const [currentCamera, setCurrentCamera] = useState<Camera>();

  // 현재 조회한 매칭방 배열
  const [rooms, setRooms] = useState<RoomResponse[]>([]);

  // 처음 렌더링 시 현재위치 저장 및 방 탐색
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentCamera({
          latitude: latitude,
          longitude: longitude,
          zoom: 12,
        });
        setRooms(
          searchRoomCurrentCamera({
            latitude: latitude,
            longitude: longitude,
            zoom: 12,
          }),
        );
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
      setCurrentCamera({
        latitude: e.latitude,
        longitude: e.longitude,
        zoom: e.zoom,
      });
      setRooms(
        searchRoomCurrentCamera({
          latitude: e.latitude,
          longitude: e.longitude,
          zoom: e.zoom,
        }),
      );
    }, 1000);
  }, []);

  // 렌더링
  return (
    // 지도가 화면 전체를 포함하기 위한 마진 설정
    <View
      className="flex-1 justify-center bg-white"
      style={{ marginTop: -insets.top }}
    >
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
            logoMargin={{ bottom: 40 }}
          >
            {rooms &&
              rooms.map((room) => (
                /** 매칭방 하나의 마커 */
                /** TODO :
                 * 마커 탭 했을 때의 동작 (바텀시트에 정보 출력 등)
                 */
                <NaverMapMarkerOverlay
                  key={room.id}
                  latitude={room.latitude}
                  longitude={room.longitude}
                  onTap={() => console.log(room.spotName)}
                  anchor={{ x: 0.5, y: 1 }}
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
