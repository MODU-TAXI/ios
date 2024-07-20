import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { PaymentUser, UserPreview } from '@type/entity/user';

interface HistoryMemberComponentProps {
  historyMember: PaymentUser;
  openUserInfoModal: (member: UserPreview) => void;
  price: number;
}

const HistoryMemberComponent: React.FC<HistoryMemberComponentProps> = ({
  historyMember,
  openUserInfoModal,
  price,
}) => {
  return (
    <Pressable
      key={historyMember.id}
      className="mt-4 flex-row items-center justify-between"
      onPress={() =>
        openUserInfoModal({
          memberId: historyMember.id,
          nickname: historyMember.nickName,
          imageUrl: historyMember.imageUrl,
          thisIsMe: true,
        })
      }
    >
      <View className="flex-row items-center">
        <FastImage
          source={{ uri: historyMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="mr-1 font-normal text-base">{historyMember.nickName}</Text>

        {historyMember.me && (
          <Text className="ml-1 text-lg font-medium tracking-tight  text-disabled2">(나)</Text>
        )}
      </View>

      <View className="flex-row items-center justify-center">
        {historyMember.status === 'COMPLETE' ? (
          <View className="flex-row items-center">
            <Text className="mr-1 text-[16px]  tracking-tight text-main ">완료</Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <Text className="mr-1 text-[16px]  tracking-tight text-[#9C9C9C] ">미완료</Text>

            <Text className="mr-1 text-[16px]  tracking-tight text-[#9C9C9C] ">|</Text>

            <Text className="mr-1 text-[16px]  tracking-tight text-[#9C9C9C]">
              {price.toLocaleString('ko-KR')}원
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default HistoryMemberComponent;
