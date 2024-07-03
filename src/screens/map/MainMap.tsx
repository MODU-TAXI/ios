import { View, Pressable } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Animated, { runOnJS } from 'react-native-reanimated';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Camera,
  NaverMapView,
  NaverMapViewRef,
  NaverMapMarkerOverlay,
} from '@mj-studio/react-native-naver-map';
import BottomSheet, {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';

import MapBottomSheetScreen from '../../components/Modal/MapBottomSheet';

import RoomMarkerComponent from '@components/Marker/RoomMarker';
import CreateRoomButtonComponent from '@components/CreateRoomButton';
import SpotFilterModalScreen from '@components/Modal/SpotFilterModal';
import TransparentSearchBoxComponent from '@components/Search/TransparentSearchBox';
import SelectedRoomDigestComponent from '@components/RoomDigest/SelectedRoomDigest';

import { userInfoState, searchParamState } from '@recoil/recoil';

import { useGetSpotMap } from '@hooks/api/spot';
import { useGetRoomIntegration } from '@hooks/api/rooms';

import { calculateRadius, getCurrentLocation } from '@utils/map';

import { MainMapScreenProps } from '@type/param/loginStack';
import { RoomIntegration, RoomFilterParam } from '@type/entity/room';

import RefreshButton from '@assets/images/Map/refreshButton.svg';
import CurrentLocationButton from '@assets/images/Map/currentLocation.svg';

const MainMapScreen = ({ route, navigation }: MainMapScreenProps) => {
  const insets = useSafeAreaInsets();
  const userInfo = useRecoilValue(userInfoState);
  const mapRef = useRef<NaverMapViewRef>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomIntegration | null>(null);
  
  // bottomSheet 인덱스 정의, 최초 렌더링 시 40% 설정
  const snapPoints = useMemo(() => ['10%', '20%', '40%', '85%'], []);
  const [mapBottomSheetIndex, setMapBottomSheetIndex] = useState<number>(1);
  const bottomSheetPosition = useSharedValue<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // bottomSheet, bottomSheetModal 핸들러
  const handleBottomSheetIndex = (index: number) => {
    setMapBottomSheetIndex(index);
  }

  const handleOpenSpotModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseSpotModal = () => {
    bottomSheetModalRef.current?.close();
  }

  // bottomSheetModal
  const modalSnapPoints = useMemo(() => ['85%'], []);
  const [spotModalIndex, setSpotModalIndex] = useState<number>(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    [],
  );

  // 택시팟 생성 버튼 위치 설정 변수
  const buttonSizeRef = useRef<View>(null);
  const [buttonSize, setButtonSize] = useState({
    width: 164,
    height: 40,
  });

  /** 택시팟 버튼 크기 계산 */
  useEffect(() => {
    const measureButtonSize = () => {
      if (buttonSizeRef.current) {
        buttonSizeRef.current.measure((x, y, width, height) => {
          if (width !== 0 && height !== 0) {
            setButtonSize({width: width, height: height});
          }
        });
      }
    };
    measureButtonSize();
  }, [buttonSizeRef.current]);

  // 현재 카메라 중심좌표 저장, 초기값 인하대 후문
  const [currentCamera, setCurrentCamera] = useState<Camera>({
    latitude: 37.451062,
    longitude: 126.656496,
    zoom: 16,
  });

  // 현재 줌에서의 탐색 범위
  const [radius, setRadius] = useState<number>(5000);

  const searchParams = useRecoilValue(searchParamState);
  const resetSearchParams = useResetRecoilState(searchParamState);

  // 검색 후 좌표설정
  useEffect(() => {
    if (searchParams && searchParams.title !== '') {
      const location = {
        latitude: searchParams.latitude,
        longitude: searchParams.longitude,
        zoom: 16,
      };
      setCurrentCamera({
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 16,
      });
      mapRef.current?.animateCameraTo(location);
    }
  }, [searchParams])

  // 필터링 상태값
  const [filterParam, setFilterParam] = useState<RoomFilterParam>({
    "sortType": "NEW",
    "spotId": undefined,
    "roomTags": [],
    "isImminent": false,
  });
  
  // 매칭방 탐색
  const { rooms: rooms, refetch } = useGetRoomIntegration({
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
    "radius": radius,
    "sortType": filterParam.sortType,
    "spotId": filterParam.spotId,
    "roomTags": filterParam.roomTags,
    "isImminent": filterParam.isImminent,
  });

  // 거점 3개와 고정카메라 좌표 리턴
  const { spotData, refetch: refetchSpot } = useGetSpotMap({
    "count": 3,
    "searchLongitude": currentCamera.longitude,
    "searchLatitude": currentCamera.latitude,
  });

  /** 필터링 부여 함수 */
  const handleFiltering = useCallback((category: string, value: any) => {
    setFilterParam({
      ...filterParam,
      [category]: value
    })
  }, [filterParam]);

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
  const handleSelectRoom = (room: RoomIntegration) => {
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
    navigation.navigate('CreateRoomScreen');
  }

  /** 검색창 이동 */
  const toSearchScreen = () => {
    resetSearchParams();
    navigation.navigate('SearchScreen');
  }
  
  return (
    <GestureHandlerRootView className="flex-1">

      {/** 지도 */}
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
                .filter((room) => room.roomId === selectedRoom.roomId)
                .map((room) => (
                  <NaverMapMarkerOverlay
                    key={`selected-${room.roomId}`}
                    latitude={room.departureLatitude}
                    longitude={room.departureLongitude}
                    onTap={() => handleSelectRoom(room)}
                    anchor={{ x: 0.5, y: 0.5 }}
                  >
                    <RoomMarkerComponent roomId={selectedRoom.roomId} spotName={selectedRoom.arrivalName} selected />
                  </NaverMapMarkerOverlay>
                ))}
              {rooms
                .filter((room) => room.roomId !== selectedRoom.roomId)
                .map((room) => (
                  <NaverMapMarkerOverlay
                    key={`unselected-${room.roomId}`}
                    latitude={room.departureLatitude}
                    longitude={room.departureLongitude}
                    onTap={() => handleSelectRoom(room)}
                    anchor={{ x: 0.5, y: 0.5 }}
                  >
                    <RoomMarkerComponent roomId={room.roomId} spotName={room.arrivalName} selected={false} />
                  </NaverMapMarkerOverlay>
                ))}
            </>
          ) : (
            // Room 선택하지 않을 시 일반 렌더링
            rooms.map((room) => (
              <NaverMapMarkerOverlay
                key={`initial-${room.roomId}`}
                latitude={room.departureLatitude}
                longitude={room.departureLongitude}
                onTap={() => handleSelectRoom(room)}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <RoomMarkerComponent roomId={room.roomId} spotName={room.arrivalName} selected={false} />
              </NaverMapMarkerOverlay>
            ))
          )}
        </NaverMapView>
      </GestureDetector>

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
          {searchParams.title !== '' ? (
            <TransparentSearchBoxComponent 
              value={searchParams.title}
              isSearched={true}
            />
          ) : (
            <TransparentSearchBoxComponent 
              value={`${userInfo.name}님 우리 어디로 떠날까요?`}
              isSearched={false}
            />
          )}
        </Pressable>
      </View>

      {/** 방 미리보기 */}
      {selectedRoom &&
        <View className='absolute top-[68%] w-full'>
          <Pressable onPress={() => toRoomDetailScreen(selectedRoom.roomId)}>
            <SelectedRoomDigestComponent roomId={selectedRoom.roomId} roomList={rooms} />
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

      <BottomSheetModalProvider>
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
            <MapBottomSheetScreen 
              roomList={rooms} 
              navigation={navigation} 
              index={mapBottomSheetIndex} 
              handleModal={handleOpenSpotModal}
              handleFilter={handleFiltering}
              filterParam={filterParam}
              spotData={spotData}
              refetch={refetch}
            />
          </BottomSheetView>
        </BottomSheet>

        {/* 거점선택 모달 */}
        <BottomSheetModal
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
          ref={bottomSheetModalRef}
          snapPoints={modalSnapPoints}
          index={spotModalIndex}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView className="flex-1">
            <SpotFilterModalScreen 
              spotData={spotData}
              handleClose={handleCloseSpotModal} 
              handleFilter={handleFiltering}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default MainMapScreen;