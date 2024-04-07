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
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold mr-1">{nickname}</Text>
        <Text className="text-[20px] text-disabled2 font-normal">
          ({temperature}'C)
        </Text>
      </View>

      <Pressable className="bg-sub100 px-3 py-2 rounded-3xl">
        <Text className="text-[12px] font-medium text-main">참여수락</Text>
      </Pressable>
    </View>
  );
};

export default WaitUserComponent;
