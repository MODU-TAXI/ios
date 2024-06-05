import { View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import {
  Camera,
  NaverMapView,
  NaverMapViewRef,
  NaverMapPathOverlay,
} from '@mj-studio/react-native-naver-map';

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
      mapRef.current?.animateCameraWithTwoCoords({
        coord1: {
          latitude: roomDetail.departureLatitude,
          longitude: roomDetail.departureLongitude,
        },
        coord2: {
          latitude: roomDetail.arrivalLatitude,
          longitude: roomDetail.arrivalLongitude,
        },
        duration: 500,
      });
    }
  }, [roomDetail]);

  return (
    <View className="shadow-md">
      <View className="mt-2 h-[240px] w-full overflow-hidden rounded-xl">
        <NaverMapView
          style={{ flex: 1 }}
          ref={mapRef}
          mapType="Basic"
          initialCamera={initial}
          locale="ko"
          isShowCompass={false}
          isShowLocationButton={false}
          isShowZoomControls={false}
          // 카메라 고정 -> 뺄 수도 ?
          onCameraChanged={() =>
            mapRef.current?.animateCameraWithTwoCoords({
              coord1: {
                latitude: roomDetail.departureLatitude,
                longitude: roomDetail.departureLongitude,
              },
              coord2: {
                latitude: roomDetail.arrivalLatitude,
                longitude: roomDetail.arrivalLongitude,
              },
              duration: 500,
            })
          }
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
