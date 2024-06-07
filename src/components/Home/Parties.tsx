import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import PartyComponent from './Party';

import { useGetRoomList } from '@hooks/api/rooms';

import { HomeScreenProps } from '@type/param/loginStack';

interface PartiesComponentProps {
  navigation: HomeScreenProps['navigation'];
}

const PartiesComponent: React.FC<PartiesComponentProps> = ({
  navigation
}) => {
  const { rooms, refetch } = useGetRoomList({
    "page": 0,
    "size": 10,
    "sortType": "NEW",
    "searchLatitude": 37.46504,
    "searchLongitude": 126.68045,
    "radius": 500000,
  })

  /** 해당 room 으로 이동 */
  const toRoomDetailScreen = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', {roomId: roomId});
  };

  return (
    <View className="px-4">
      <View>
        <Text className="text-[18px] font-semibold">실시간 택시팟을 알려드려요!</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-4">
        {rooms.map((room, index) => (
          <Pressable key={index} onPress={() => toRoomDetailScreen(room.roomId)} >
            <PartyComponent roomDetail={room} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default PartiesComponent;
