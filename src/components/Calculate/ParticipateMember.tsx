import React from 'react';
import { View, Text } from 'react-native';

import { UserPreview } from '@type/entity/user';

import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUserComponentProps {
  participateMember: UserPreview;
  price: number;
}

const ParticipateMemberComponent: React.FC<ParticipateUserComponentProps> = ({
  participateMember,
  price,
}) => {
  return (
    <View key={participateMember.memberId} className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="font-normal text-base">{participateMember.nickname}</Text>
        {participateMember.thisIsMe && (
          <Text className="ml-1 text-lg font-medium tracking-tight  text-disabled2">(나)</Text>
        )}
      </View>

      <Text className="text-[16px] tracking-tight  text-[#9C9C9C]">
        {price.toLocaleString('ko-KR')}원
      </Text>
    </View>
  );
};

export default ParticipateMemberComponent;
