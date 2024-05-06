import React from 'react';
import { View, Text, Pressable } from 'react-native';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface waitingUser {
  id: number;
  nickname: string;
  temperature: number;
  me: boolean;
}

interface WaitingUserComponentProps {
  user: waitingUser;
}
const WaitingUserComponent: React.FC<WaitingUserComponentProps> = ({
  user,
}) => {
  return (
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold mr-1">{user.nickname}</Text>
        <Text className="text-[20px] text-disabled2 font-normal">
          ({user.temperature}'C)
        </Text>
      </View>

      <Pressable className="bg-sub100 px-3 py-2 rounded-3xl">
        <Text className="text-[12px] font-medium text-main">참여수락</Text>
      </Pressable>
    </View>
  );
};

export default WaitingUserComponent;
