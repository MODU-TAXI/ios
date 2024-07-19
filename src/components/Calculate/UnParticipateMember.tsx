import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Pressable } from 'react-native';

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
    <View key={unParticipateMember.memberId} className="mt-1 flex-row items-center justify-between">
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

      <Pressable
        className="flex-row items-center justify-center py-3"
        onPress={() => addUser(unParticipateMember)}
      >
        <Text className="mr-1 text-[16px] tracking-tight text-[#9C9C9C]">
          {price.toLocaleString('ko-KR')}원
        </Text>

        <PlusButton />
      </Pressable>
    </View>
  );
};

export default UnParticipateMemberComponent;
