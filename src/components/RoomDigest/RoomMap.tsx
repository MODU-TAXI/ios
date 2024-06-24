import { View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import {
  Camera,
  NaverMapView,
  NaverMapViewRef,
  NaverMapPathOverlay,
} from '@mj-studio/react-native-naver-map';

import { calculateDist } from '@utils/search';

import { RoomDetail } from '@type/entity/room';

interface RoomMapComponentProps {
  roomDetail: RoomDetail;
}

const RoomMapComponent: React.FC<RoomMapComponentProps> = ({ roomDetail }) => {
  const mapRef = useRef<NaverMapViewRef>(null);

  // 첫 렌더링 시 카메라 좌표
  const initial: Camera = {
    latitude: 37.46504,
    longitude: 126.68045,
    zoom: 16,
  };

  // roomDetail 저장 시 카메라를 출발-도착지 사이로 이동
  useEffect(() => {
    if (roomDetail) {
      const baseDist = 1000;
      const dist = calculateDist(roomDetail.maxLatitude, roomDetail.maxLongitude, roomDetail.minLatitude, roomDetail.minLongitude);
      const scaleFactor = Math.log10(dist / baseDist + 1) * 0.05;

      const deltaMax = 1 + scaleFactor;
      const deltaMin = 1 - scaleFactor;

      mapRef.current?.animateCameraWithTwoCoords({
        coord1: {
          latitude: roomDetail.maxLatitude * deltaMax,
          longitude: roomDetail.maxLongitude * deltaMax,
        },
        coord2: {
          latitude: roomDetail.minLatitude * deltaMin,
          longitude: roomDetail.minLongitude * deltaMin,
        },
        duration: 500,
      });
    }
  }, [roomDetail]);

  return (
    <View className="mt-2 rounded-xl bg-white shadow-sm">
      <View className="h-[240px] w-full overflow-hidden rounded-xl">
        <NaverMapView
          style={{ flex: 1 }}
          ref={mapRef}
          mapType="Basic"
          initialCamera={initial}
          locale="ko"
          isShowCompass={false}
          isShowLocationButton={false}
          isShowZoomControls={false}
        >
          {roomDetail.path.coordinates.length > 2 && (
            <NaverMapPathOverlay coords={roomDetail.path.coordinates} width={8} color={'#40CEAC'} />
          )}
        </NaverMapView>
      </View>
    </View>
  );
};

export default RoomMapComponent;