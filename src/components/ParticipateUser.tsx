import React from 'react';
import { View, Text } from 'react-native';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUserComponentProps {
  nickname: string;
  temperature: number;
  me: boolean;
}

const ParticipateUserComponent: React.FC<ParticipateUserComponentProps> = ({
  nickname,
  temperature,
  me,
}) => {
  return (
    <View className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-[20px] font-semibold">{nickname}</Text>
        {me && (
          <Text className="text-lg text-disabled2 font-medium ml-1">(나)</Text>
        )}
      </View>

      <Text className="text-[20px] text-disabled2 font-normal">
        {temperature}'C
      </Text>
    </View>
  );
};

export default ParticipateUserComponent;
