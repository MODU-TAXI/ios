import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

import { UserPreview } from '@type/entity/user';

import MinusButton from '@assets/images/Calculate/MinusButton.svg';

interface ParticipateMemberComponentProps {
  participateMember: UserPreview;
  price: number;
  exceptUser: (member: UserPreview) => void;
}

const ParticipateMemberComponent: React.FC<ParticipateMemberComponentProps> = ({
  participateMember,
  price,
  exceptUser,
}) => {
  return (
    <View key={participateMember.memberId} className="mt-1 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <FastImage
          source={{ uri: participateMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="font-normal text-base">{participateMember.nickname}</Text>
        {participateMember.thisIsMe && (
          <Text className="ml-1 text-lg font-medium tracking-tight  text-disabled2">(나)</Text>
        )}
      </View>

      <Pressable
        className="flex-row items-center justify-center py-3 "
        onPress={() => exceptUser(participateMember)}
      >
        {/* <Text className="mr-1 text-[16px]  tracking-tight text-[#9C9C9C]">
          {price.toLocaleString('ko-KR')}원
        </Text> */}

        <MinusButton />
      </Pressable>
    </View>
  );
};

export default ParticipateMemberComponent;
