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

import MapBottomSheetScreen from './MapBottomSheet';

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

  // 택시팟 생성 버튼 위치 설정용
  const buttonSizeRef = useRef<View>(null);
  const [buttonSize, setButtonSize] = useState({
    width: 0,
    height: 0,
  });

  // 바텀시트 snap point
  const snapPoints = useMemo(() => ['40%', '20%', '10%', '85%'], []);
  // const [isShowButton, setIsShowButton] = useState<boolean>(true);

  const bottomSheetPosition = useSharedValue<number>(0);
  // useEffect(() => {
  //   if (bottomSheetPosition.value > 500) {
  //     setIsShowButton(true)
  //   } else {
  //     setIsShowButton(false)
  //   }
  // }, [bottomSheetPosition.value])

  /** 택시팟 버튼 크기 계산 */
  useEffect(() => {
    if (buttonSizeRef.current) {
      buttonSizeRef.current.measure((x, y, width, height) => {
        setButtonSize({width: width, height: height});
      });
    }
  }, [])

  // const animatedButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: -(buttonSize.width / 2) },
  //       { translateY: bottomSheetPosition.value > Number(snapPoints[0].replace('%','')) ? 0 : -(buttonSize.height * 1.5) },
  //     ],
  //     top: bottomSheetPosition.value > Number(snapPoints[0].replace('%','')) ? 'auto' : bottomSheetPosition.value,
  //     bottom: bottomSheetPosition.value > Number(snapPoints[0].replace('%','')) ? Number(snapPoints[0].replace('%','')) : 'auto',
  //   };
  // });

  // 현재 카메라 중심좌표 저장, 초기값 인하대 후문
  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 16,
  });

  // 현재 줌에서의 탐색 범위
  const [radius, setRadius] = useState<number>(600);

  // 매칭방 리스트 객체
  const { rooms: rooms, refetch: refetch } = useGetRoomCurrentCamera(
    currentCamera.longitude,
    currentCamera.latitude,
    radius,
  );

  const { rooms: roomList, refetch: refetchRoomList } = useGetRoomList({
    "page": 0,
    "size": 10,
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
    "sortType": "NEW",
    "radius": radius,
  })

  // 처음 렌더링 시 현재위치 저장 및 방 탐색
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

  /** 카메라 이동시 딜레이 주며 함수호출: radius 계산, selectedRoom 초기화 */
  const onCameraChange = useCallback((e: Camera) => {
    // timeout 시
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // 바텀시트 20% 복귀, 방 선택 초기화
      bottomSheetRef.current?.snapToIndex(1);
      setSelectedRoom(null);

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

  /** 방 선택 및 바텀시트 10% 내리기 */
  const handleSelectRoom = (room: RoomCurrentCamera) => {
    setSelectedRoom(room);
    bottomSheetRef.current?.snapToIndex(2);
  }

  // 지도화면 터치 시 selectedRoom 초기화 및 바텀시트 20% 복귀
  const tap = Gesture.Tap()
    .onTouchesDown(() => {
      runOnJS(setSelectedRoom)(null);
      // 여기서 바텀시트 접근시 동작하지 않는 버그 존재
      // bottomSheetRef.current?.snapToIndex(1);
    });

  /** 해당 마커의 room 으로 이동 */
  const toRoomDetailScreen = useCallback((roomId: number) => {
    navigation.navigate('RoomDetailScreen', {roomId: roomId});
  }, []);

  /** 매칭방 생성으로 이동 */
  const toCreateRoomScreen = () => {
    navigation.navigate('CreateRoomScreen');
  }

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  }
  
  return (
    <GestureHandlerRootView className="flex-1">
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
        index={0}
        snapPoints={snapPoints}
        animatedPosition={bottomSheetPosition}
      >
        <BottomSheetView
          className="flex-1 items-center"
        >
          <MapBottomSheetScreen roomList={roomList} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

export default MainMapScreen;