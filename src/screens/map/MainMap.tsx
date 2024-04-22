import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Button, Text, Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import NaverMapView, { Marker } from 'react-native-nmap';

import MapBottomSheetScreen from './MapBottomSheet';
import pinMarker from '@hooks/map/pinMarker';

const MainMapScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 화면의 어디에서 멈추는지 snap point
  // TODO: '100%' 일 때 하나의 스크린처럼 보이도록 상단 헤더 렌더링 및 기존 컴포넌트 내리기
  const snapPoints = useMemo(() => ['40%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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

  const P0 = { longitude: 126.68045, latitude: 37.46504 };
  // 더미데이터
  const data = {
    rooms: [
      {
        id: 2,
        longitude: 126.68045,
        latitude: 37.46504,
        spotName: '주안역',
      },
      {
        id: 3,
        longitude: 126.656563,
        latitude: 37.451062,
        spotName: '인하대학교 후문',
      },
    ],
  };
  const fetchedRooms = pinMarker(data.rooms);

  // renders
  return (
    <View className="flex-1 p-6 justify-center bg-white">
      <View className="flex-1 w-full h-[200px] mt-10 mb-72">
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          showsMyLocationButton={true}
          center={{ ...P0, zoom: 16 }}
        >
          {fetchedRooms.map((room) => (
            <Marker key={room.id} coordinate={room.coord} />
          ))}
        </NaverMapView>
      </View>
      <BottomSheet
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
