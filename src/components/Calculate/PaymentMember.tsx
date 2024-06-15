import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { PaymentUser, UserPreview } from '@type/entity/user';

interface PaymentMemberComponentProps {
  paymentMember: PaymentUser;
  price: number;
}

const PaymentMemberComponent: React.FC<PaymentMemberComponentProps> = ({
  paymentMember,
  price,
}) => {
  return (
    <View key={paymentMember.id} className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <FastImage
          source={{ uri: paymentMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="mr-1 font-normal text-base">{paymentMember.nickName}</Text>
        <Text className="font-normal text-base">{paymentMember.name}</Text>

        {paymentMember.me && (
          <Text className="ml-1 text-lg font-medium tracking-tight  text-disabled2">(나)</Text>
        )}
      </View>

      <View className="flex-row items-center justify-center">
        {paymentMember.status === 'COMPLETE' ? (
          <View className="flex-row items-center">
            <Text className="mr-1 text-[16px]  tracking-tight text-main ">완료</Text>

            <Text className="mr-1 text-[16px]  tracking-tight text-main ">|</Text>

            <Text className="mr-1 text-[16px]  tracking-tight text-main">
              {price.toLocaleString('ko-KR')}원
            </Text>
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
    </View>
  );
};

export default PaymentMemberComponent;
