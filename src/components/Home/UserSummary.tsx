import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { HistoriesMonthlyResponse } from '@server/responseTypes/history';

import { UserInfo } from '@type/entity/user';
import { HomeScreenProps } from '@type/param/loginStack';

import Check from '@assets/images/Home/Popper.svg';
import Receipt from '@assets/images/Home/Receipt.svg';

interface UserSummaryComponentProps {
  navigation: HomeScreenProps['navigation'];
  histories: HistoriesMonthlyResponse;
  month: number;
  userInfo: UserInfo;
}

const UserSummaryComponent: React.FC<UserSummaryComponentProps> = ({
  navigation,
  histories,
  month,
  userInfo,
}) => {
  const toSummaryScreen = () => {
    navigation.navigate('HistoryScreen');
  };

  return (
    <View className="mb-[120px] flex-row items-center px-4">
      {/** 이용내역 */}
      <View className="flex w-1/2 flex-col pr-2">
        <Text className="mb-3 font-semibold text-base text-gray900">이용내역</Text>
        <Pressable
          onPress={toSummaryScreen}
          className="flex h-20 flex-row items-center justify-start truncate rounded-xl border-2 border-[#EBEBEB] px-3"
        >
          <Receipt width={32} />
          <View className="ml-1 flex truncate">
            <Text className="text-xs text-gray700">{month}월 아낀금액</Text>
            <View className="flex flex-row items-center">
              <Text className="text-sm font-semibold text-success">
                {(
                  histories.accumulateTotalCharge - histories.accumulatePortionCharge
                ).toLocaleString('ko-KR')}
                원
              </Text>
              {/* <Text className="text-xs text-gray700"> 아꼈어요!</Text> */}
            </View>
          </View>
        </Pressable>
      </View>

      {/** 나의 매칭률 */}
      <View className="w-1/2 pl-2">
        <Text className="mb-3 font-semibold text-base text-gray900">나의 매칭률</Text>
        <View className="flex h-20 flex-row items-center justify-start truncate rounded-xl border-2 border-[#EBEBEB] px-3">
          <Check width={32} />
          <View className="mx-1 flex">
            <Text className="text-xs text-gray700">{userInfo.name}님의 매칭횟수</Text>
            <Text className="text-sm font-semibold text-success">{userInfo.matchingCount}회</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserSummaryComponent;
