import React from 'react';
import { View, Text } from 'react-native';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';

interface ParticipateUsersComponentProps {
  roomId: number;
}

const users = [
  {
    id: 1,
    nickname: '졸다가 늦은 판다',
    temperature: 36.5,
    me: false,
  },
  {
    id: 2,
    nickname: '졸다가 늦은 판다',
    temperature: 36.5,
    me: false,
  },
  {
    id: 3,
    nickname: '졸다가 늦은 판다',
    temperature: 36.5,
    me: false,
  },
];

const ParticipateUsersComponent: React.FC<ParticipateUsersComponentProps> = ({
  roomId,
}) => {
  return (
    <View className="py-8 px-1">
      <View>
        <Text className="text-[20px] font-semibold">참여멤버</Text>
      </View>

      {users.map((user) => (
        <View
          key={user.id}
          className="flex-row justify-between items-center mt-4"
        >
          <View className="flex-row items-center">
            <UserBasicImage className="mr-1" />
            <Text className="text-lg font-semibold">{user.nickname}</Text>

            {user.me && (
              <Text className="text-lg text-disabled2 font-medium ml-1">
                (나)
              </Text>
            )}
          </View>

          <Text className="text-lg text-disabled2 font-normal">
            {user.temperature}'C
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ParticipateUsersComponent;
