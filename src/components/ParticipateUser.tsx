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
    <View className="mt-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold">{nickname}</Text>

        {me && (
          <Text className="ml-1 text-lg font-medium text-disabled2">(나)</Text>
        )}
      </View>

      <Text className="text-lg font-normal text-disabled2">
        {temperature}'C
      </Text>
    </View>
  );
};

export default ParticipateUserComponent;
