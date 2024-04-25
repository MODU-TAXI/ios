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
import { searchRoomCurrentCamera } from '@utils/map';
import { RoomResponse } from '@server/responseTypes/map';

import MapBottomSheetScreen from './MapBottomSheet';

import ChevronForwardSvg from '@assets/images/Map/chevronForward.svg';

const MainMapScreen = () => {
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
  const [currentCamera, setCurrentCamera] = useState<Camera>({
    // 최초 위치는 더미데이터 사용 (인후)
    longitude: 126.656563,
    latitude: 37.451062,
    zoom: 12,
  });

  const [rooms, setRooms] = useState<RoomResponse[]>([
    {
      id: 14,
      longitude: 126.69488,
      latitude: 37.46318,
      spotName: '인하대학교 후문',
    },
    {
      id: 15,
      longitude: 126.656152,
      latitude: 37.451098,
      spotName: '인하대학교 후문',
    },
    // {
    //   id: 6,
    //   longitude: 126.67889,
    //   latitude: 37.513138,
    //   spotName: '인하대학교 후문',
    // },
  ]);

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
      searchRoomCurrentCamera({
        latitude: e.latitude,
        longitude: e.longitude,
        zoom: e.zoom,
      });
    }, 1000);
  }, []);

  // 렌더링
  return (
    <View className="flex-1 p-6 justify-center bg-white">
      <View className="flex-1 w-full h-[200px] mt-10 mb-72">
        <NaverMapView
          style={{ flex: 1 }}
          mapType="Basic"
          initialCamera={currentCamera}
          onCameraChanged={onCameraChange}
          locale="ko"
        >
          {rooms &&
            rooms.map((room) => (
              <NaverMapMarkerOverlay
                key={room.id}
                latitude={room.latitude}
                longitude={room.longitude}
                onTap={() => console.log(room.spotName)}
                anchor={{ x: 0.5, y: 1 }}
              >
                {/** TODO : 컴포넌트 분리 */}
                <View className="flex-1 items-center justify-center">
                  <View
                    className="flex flex-row bg-white border-gray100 w-auto m-4 rounded-full"
                    style={{
                      shadowColor: 'rgba(102, 102, 102, 0.25)',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 1,
                      elevation: 8,
                    }}
                  >
                    <Text className="text-center text-gray600 w-fit text-base py-2 pl-4">
                      {room.spotName}
                    </Text>
                    <View className="flex justify-center pr-2">
                      <ChevronForwardSvg />
                    </View>
                  </View>
                </View>
              </NaverMapMarkerOverlay>
            ))}
        </NaverMapView>
      </View>
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
