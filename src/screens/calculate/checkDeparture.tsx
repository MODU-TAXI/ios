import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import MembersComponent from '@components/Calculate/Members';

import { useGetRoomMembers } from '@hooks/api/rooms';

import { CheckDepartureScreenProps } from '@type/param/loginStack';

const CheckDepartureScreen = ({ navigation, route }: CheckDepartureScreenProps) => {
  const { roomPreview } = route.params;

  const { roomMembers } = useGetRoomMembers(roomPreview.roomId); // 참여자 목록

  const toAmountScreen = async () => {
    navigation.navigate('AmountScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <HeaderComponent title="출발완료 확인하기" />

      <View className="flex-1 px-4 pt-8">
        {/* 글씨 */}
        <View className="flex-col px-3">
          <Text className="text-xl font-bold tracking-tight">
            혹시 같이 <Text className="tracking-tight text-main">타지 않은</Text>
          </Text>
          <Text className="text-xl font-bold tracking-tight">멤버가 있나요?</Text>
        </View>

        {/* 멤버 */}
        <MembersComponent members={roomMembers.inList} />
      </View>

      <View className="mb-4 px-8">
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={toAmountScreen}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckDepartureScreen;
