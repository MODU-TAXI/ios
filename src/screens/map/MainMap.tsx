import { useRecoilValue } from 'recoil';
import { useSharedValue } from 'react-native-reanimated';
import { View, Pressable, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, { runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Coord,
  Camera,
  NaverMapView,
  NaverMapViewRef,
  NaverMapMarkerOverlay,
} from '@mj-studio/react-native-naver-map';

import MapBottomSheetScreen from '../../components/Map/MapBottomSheet';

import RoomMarkerComponent from '@components/Marker/RoomMarker';
import CreateRoomButtonComponent from '@components/CreateRoomButton';
import TransparentSearchBoxComponent from '@components/Search/TransparentSearchBox';
import SelectedRoomDigestComponent from '@components/RoomDigest/SelectedRoomDigest';

import { userInfoState } from '@recoil/recoil';

import { useGetRoomList, useGetRoomCurrentCamera } from '@hooks/api/rooms';

import { calculateRadius, getCurrentLocation } from '@utils/map';

import { RoomCurrentCamera } from '@type/entity/room';
import { MainMapScreenProps } from '@type/param/loginStack';

import MapPin from '@assets/images/Map/MapPin.svg';
import MapPinGray from '@assets/images/Map/MapPinGray.svg';
import RefreshButton from '@assets/images/Map/refreshButton.svg';
import CurrentLocationButton from '@assets/images/Map/currentLocation.svg';

const MainMapScreen = ({ navigation }: MainMapScreenProps) => {
  const insets = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<NaverMapViewRef>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomCurrentCamera | null>(null);
  
  // bottomSheet 인덱스 정의, 최초 렌더링 시 40% 설정
  const snapPoints = useMemo(() => ['10%', '20%', '40%', '85%'], []);
  const [mapBottomSheetIndex, setMapBottomSheetIndex] = useState<number>(2);
  const bottomSheetPosition = useSharedValue<number>(0);

  // bottomSheet 핸들러
  const handleBottomSheetIndex = (index: number) => {
    setMapBottomSheetIndex(index);
  }

  // 택시팟 생성 버튼 위치 설정 변수
  const buttonSizeRef = useRef<View>(null);
  const [buttonSize, setButtonSize] = useState({
    width: 0,
    height: 0,
  });

  /** 택시팟 버튼 크기 계산 */
  useEffect(() => {
    if (buttonSizeRef.current) {
      buttonSizeRef.current.measure((x, y, width, height) => {
        setButtonSize({width: width, height: height});
      });
    }
  }, [buttonSizeRef.current])

  // 현재 카메라 중심좌표 저장, 초기값 인하대 후문
  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 16,
  });

  // 현재 줌에서의 탐색 범위
  const [radius, setRadius] = useState<number>(600);

  // 매칭방 리스트 객체
  const { rooms: rooms, refetch: refetch } = useGetRoomCurrentCamera({
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
    "radius": radius,
  });

  const { rooms: roomList, refetch: refetchRoomList } = useGetRoomList({
    "page": 0,
    "size": 10,
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
    "sortType": "NEW",
    "radius": radius,
  })

  // 처음 렌더링 시 현재위치로
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentCamera({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      mapRef.current?.animateCameraTo(location);
    };
    fetchCurrentLocation();
  }, [])

  // timeout 정보 저장 Ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /** 카메라 이동시 딜레이 주며 함수호출: radius 계산, selectedRoom 초기화, bottomSheet 20% 복귀 */
  const onCameraChange = useCallback((e: Camera) => {
    // timeout 시
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setMapBottomSheetIndex(1);
    setSelectedRoom(null);

    timeoutRef.current = setTimeout(() => {
      // radius 계산
      let newRadius = 2500;
      if (e.zoom) {
        newRadius = calculateRadius(e.zoom);
        setRadius(newRadius);
      }

      // 조정된 센터 저장
      setCurrentCamera({
        latitude: e.latitude,
        longitude: e.longitude,
        zoom: e.zoom,
      });
    }, 300);
  }, []);

  /** 현재위치 이동 버튼 */
  const moveToCurrentLocation = async() => {
    const currentLocation = await getCurrentLocation();
    setCurrentCamera({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      zoom: 16,
    });
    mapRef.current?.animateCameraTo(currentLocation);
  }

  /** 방 선택 및 bottomSheet 10%로 내림 */
  const handleSelectRoom = (room: RoomCurrentCamera) => {
    setSelectedRoom(room);
    setMapBottomSheetIndex(0);
  }

  /** 탭 이벤트 감지: selectedRoom 초기화, bottomSheet 40% 에서 탭 감지 시 20% 복귀 */
  const tap = Gesture.Tap()
    .onTouchesDown(() => {
      if (mapBottomSheetIndex === 2) {
        runOnJS(setMapBottomSheetIndex)(1);
      }
      runOnJS(setSelectedRoom)(null);
    });

  /** 해당 마커의 room 으로 이동 */
  const toRoomDetailScreen = useCallback((roomId: number) => {
    navigation.navigate('RoomDetailScreen', {roomId: roomId});
  }, []);

  /** 매칭방 생성으로 이동 */
  const toCreateRoomScreen = () => {
    // TODO : reverse geocoding 으로 출발지 recoil 저장하며 이동
    navigation.navigate('CreateRoomScreen');
  }

  /** 검색창 이동 */
  const toSearchScreen = () => {
    // TODO : 메인맵 거점 필터링용 검색창 화면 분리
    navigation.navigate('SearchScreen');
  }
  
  return (
    <GestureHandlerRootView className="flex-1">

      {/** 지도 */}
      <Pressable 
        className="flex-1" 
        onPressIn={() => setIsTouching(true)}
        onPressOut={() => setIsTouching(false)}
      >
        <GestureDetector gesture={tap} >
          <NaverMapView 
            ref={mapRef}
            style={{ flex: 1 }}
            mapType="Basic"
            initialCamera={currentCamera}
            onCameraChanged={onCameraChange}
            locale="ko"
            isShowLocationButton={false}
            isShowZoomControls={false}
            isShowScaleBar={false}
            logoAlign="BottomLeft"
          >
            {selectedRoom ? (
              // Room 선택시 마커 변경하여 렌더링
              <>
                {rooms
                  .filter((room) => room.id === selectedRoom.id)
                  .map((room) => (
                    <NaverMapMarkerOverlay
                      key={`selected-${room.id}`}
                      latitude={room.departureLatitude}
                      longitude={room.departureLongitude}
                      onTap={() => handleSelectRoom(room)}
                      anchor={{ x: 0.5, y: 0.5 }}
                    >
                      <RoomMarkerComponent roomId={selectedRoom.id} spotName={selectedRoom.spotName} selected />
                    </NaverMapMarkerOverlay>
                  ))}
                {rooms
                  .filter((room) => room.id !== selectedRoom.id)
                  .map((room) => (
                    <NaverMapMarkerOverlay
                      key={`unselected-${room.id}`}
                      latitude={room.departureLatitude}
                      longitude={room.departureLongitude}
                      onTap={() => handleSelectRoom(room)}
                      anchor={{ x: 0.5, y: 0.5 }}
                    >
                      <RoomMarkerComponent roomId={room.id} spotName={room.spotName} selected={false} />
                    </NaverMapMarkerOverlay>
                  ))}
              </>
            ) : (
              // Room 선택하지 않을 시 일반 렌더링
              rooms.map((room) => (
                <NaverMapMarkerOverlay
                  key={`initial-${room.id}`}
                  latitude={room.departureLatitude}
                  longitude={room.departureLongitude}
                  onTap={() => handleSelectRoom(room)}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <RoomMarkerComponent roomId={room.id} spotName={room.spotName} selected={false} />
                </NaverMapMarkerOverlay>
              ))
            )}
          </NaverMapView>
        </GestureDetector>
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
          <TransparentSearchBoxComponent 
            value={`${userInfo.name}님 우리 어디로 떠날까요?`}
            isSearched={false}
          />
        </Pressable>
      </View>

      {/** 중앙 마커 */}
      <View 
        className="absolute left-1/2 top-1/2"
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

      {/** 방 미리보기 */}
      {selectedRoom &&
        <View className='absolute top-[68%] w-full'>
          <Pressable onPress={() => toRoomDetailScreen(selectedRoom.id)}>
            <SelectedRoomDigestComponent roomId={selectedRoom.id} roomList={roomList} />
          </Pressable>
        </View>
      }

      {/** 생성, 내위치, 새로고침 버튼 */}
      <Animated.View 
        className="absolute left-1/2 flex flex-row"
        style={{
          top: bottomSheetPosition,
          transform: [
            { translateX: -(buttonSize.width/2) }, 
            { translateY: -(buttonSize.height*1.5) }
          ],
          display: mapBottomSheetIndex === 3 ? 'none' : 'flex',
        }}
      >
        <Pressable
          ref={buttonSizeRef}
          onPress={toCreateRoomScreen}
        >
          <CreateRoomButtonComponent />
        </Pressable>

        <Pressable
          className='ml-2'
          onPress={moveToCurrentLocation}
        >
          <CurrentLocationButton />
        </Pressable>

        <Pressable
          onPress={() => refetch()}
        >
          <RefreshButton />
        </Pressable>
      </Animated.View>

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
        index={mapBottomSheetIndex}
        onChange={handleBottomSheetIndex}
        snapPoints={snapPoints}
        animatedPosition={bottomSheetPosition}
      >
        <BottomSheetView
          className="flex-1 items-center"
        >
          <MapBottomSheetScreen roomList={roomList} navigation={navigation} index={mapBottomSheetIndex} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

export default MainMapScreen;