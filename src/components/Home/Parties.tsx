import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import PartyComponent from './Party';

import { RoomList } from '@type/entity/room';
import { HomeScreenProps } from '@type/param/loginStack';

import SadFace from '@assets/images/Home/SadFace.svg';

interface PartiesComponentProps {
  navigation: HomeScreenProps['navigation'];
  rooms: RoomList[];
}

const PartiesComponent: React.FC<PartiesComponentProps> = ({ navigation, rooms }) => {
  /** 해당 room 으로 이동 */
  const toRoomDetailScreen = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  return (
    <View className="px-4">
      <View>
        <Text className="text-[18px] font-semibold">실시간 택시팟을 알려드려요!</Text>
      </View>
      {rooms.length > 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mt-4">
          {rooms.map((room, index) => (
            <Pressable key={index} onPress={() => toRoomDetailScreen(room.roomId)}>
              <PartyComponent roomDetail={room} />
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View className="mt-3 h-[128px] flex-col items-center justify-center rounded-xl border-2 border-[#EBEBEB]">
          <SadFace />
          <Text className="mt-2 text-[12px] font-medium tracking-tight text-[#D7D7D7]">
            실시간 택시팟이 없어요!
          </Text>
        </View>
      )}
    </View>
  );
};

export default PartiesComponent;
