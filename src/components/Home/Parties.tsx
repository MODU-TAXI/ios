import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import PartyComponent from './Party';

import { RoomList } from '@type/entity/room';
import { HomeScreenProps } from '@type/param/loginStack';

interface PartiesComponentProps {
  navigation: HomeScreenProps['navigation'];
  rooms: RoomList[];
}

const PartiesComponent: React.FC<PartiesComponentProps> = ({
  navigation,
  rooms,
}) => {
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
