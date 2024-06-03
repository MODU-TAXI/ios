import { useRecoilState } from 'recoil';
import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import MembersComponent from '@components/Calculate/Members';

import { calculateState } from '@recoil/recoil';

import { useGetRoomMembers } from '@hooks/api/rooms';

import { User, UserPreview } from '@type/entity/user';
import { CheckDepartureScreenProps } from '@type/param/loginStack';

const CheckDepartureScreen = ({ navigation, route }: CheckDepartureScreenProps) => {
  const { roomPreview } = route.params;

  const { roomMembers } = useGetRoomMembers(roomPreview.roomId); // 참여자 목록

  const [unParticipateMembers, setUnParticipateMembers] = useState<UserPreview[]>([]);

  const [, setCalculate] = useRecoilState(calculateState);

  const toAmountScreen = async () => {
    const filteredMembers = roomMembers.inList.filter(
      (member) =>
        !unParticipateMembers.some(
          (unParticipateMember) => unParticipateMember.memberId === member.memberId,
        ),
    );

    setCalculate((prev) => ({
      ...prev,
      users: filteredMembers,
    }));

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
        <MembersComponent
          members={roomMembers.inList}
          setUnParticipateMembers={setUnParticipateMembers}
        />
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
