import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { UserPreview } from '@type/entity/user';

import PlusButton from '@assets/images/Calculate/PlusButton.svg';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface UnParticipateMemberComponentProps {
  unParticipateMember: UserPreview;
  price: number;
  addUser: (member: UserPreview) => void;
}

const UnParticipateMemberComponent: React.FC<UnParticipateMemberComponentProps> = ({
  unParticipateMember,
  price,
  addUser,
}) => {
  return (
    <View key={unParticipateMember.memberId} className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <FastImage
          source={{ uri: unParticipateMember.imageUrl }}
          className="mr-2 h-[24px] w-[24px] rounded-full"
        />

        <Text className="font-normal text-base">{unParticipateMember.nickname}</Text>
        {unParticipateMember.thisIsMe && (
          <Text className="ml-1 text-lg font-medium tracking-tight  text-disabled2">(나)</Text>
        )}
      </View>

      <View className="flex-row items-center justify-center">
        <Text className="mr-1 text-[16px]  tracking-tight text-[#9C9C9C]">
          {price.toLocaleString('ko-KR')}원
        </Text>

        <PlusButton onPress={() => addUser(unParticipateMember)} />
      </View>
    </View>
  );
};

export default UnParticipateMemberComponent;
