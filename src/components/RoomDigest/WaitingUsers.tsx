import React from 'react';
import { View, Text, Pressable } from 'react-native';
import UserBasicImage from '@assets/images/Match/UserBasicImage.svg';
import WaitingUserComponent from './WaitingUser';

interface WaitingUsersComponentProps {
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
const WaitingUsersComponent: React.FC<WaitingUsersComponentProps> = ({
  roomId,
}) => {
  return (
    <View className="py-8 px-1">
      <View>
        <Text className="text-[20px] font-semibold">대기멤버</Text>
      </View>

      {users.map((user, index) => (
        <WaitingUserComponent key={index} user={user} />
      ))}
    </View>
  );
};

export default WaitingUsersComponent;
