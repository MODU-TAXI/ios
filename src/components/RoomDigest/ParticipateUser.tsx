import React from 'react';
import { View, Text } from 'react-native';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUser {
  id: number;
  nickname: string;
  temperature: number;
  me: boolean;
}

interface ParticipateUserComponentProps {
  user: ParticipateUser;
}

const ParticipateUserComponent: React.FC<ParticipateUserComponentProps> = ({
  user,
}) => {
  return (
    <View key={user.id} className="flex-row justify-between items-center mt-4">
      <View className="flex-row items-center">
        <UserBasicImage className="mr-1" />
        <Text className="text-lg font-semibold">{user.nickname}</Text>

        {user.me && (
          <Text className="text-lg text-disabled2 font-medium ml-1">(나)</Text>
        )}
      </View>

      <Text className="text-lg text-disabled2 font-normal">
        {user.temperature}'C
      </Text>
    </View>
  );
};

export default ParticipateUserComponent;
