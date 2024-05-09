import React from 'react';
import { View, Text, Pressable } from 'react-native';

import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface WaitUserComponentProps {
  nickname: string;
  temperature: number;
}

const WaitUserComponent: React.FC<WaitUserComponentProps> = ({
  nickname,
  temperature,
}) => {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="mr-1 text-lg font-semibold">{nickname}</Text>
        <Text className="text-[20px] font-normal text-disabled2">
          ({temperature}'C)
        </Text>
      </View>

      <Pressable className="rounded-3xl bg-sub100 px-3 py-2">
        <Text className="text-[12px] font-medium text-main">참여수락</Text>
      </Pressable>
    </View>
  );
};

export default WaitUserComponent;
