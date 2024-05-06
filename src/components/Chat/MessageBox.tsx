import React from 'react';
import { View, Text } from 'react-native';

type MessageBody = {
  content: string;
  dateTime: Date;
  memberId: number;
  roomId: number;
  sender: string;
  messageType: 'JOIN' | 'CHAT' | 'LEAVE';
};

interface MessageBoxComponentProps {
  message: any;
  memberId: number;
}

export const MessageBoxComponent: React.FC<MessageBoxComponentProps> = ({
  message,
  memberId,
}) => {
  // 타입 추가
  if (message.messageType === 'CHAT') {
    if (message.memberId === memberId) {
      return (
        <View className="items-end mt-2">
          <View className="flex-row">
            {/* 이름 + 채팅 */}
            <View className="flex-col mr-2">
              {/* 이름 */}
              <View className="items-end">
                <Text>{message.sender}</Text>
              </View>

              {/* 채팅 */}
              <View className="px-2 py-2 rounded-xl border-2 ">
                <Text className="">{message.content}</Text>
              </View>
            </View>

            {/* 프로필 이미지 */}
            <View className="w-10 h-10 rounded-full border-2 p-2"></View>
          </View>
        </View>
      );
    } else {
      return (
        <View className="items-start mt-2 ">
          <View className="flex-row">
            {/* 프로필 이미지 */}
            <View className="w-10 h-10 rounded-full border-2 p-2"></View>

            {/* 이름 + 채팅 */}
            <View className="flex-col ml-2">
              {/* 이름 */}
              <View>
                <Text>{message.sender}</Text>
              </View>

              {/* 채팅 */}
              <View className="px-2 py-2 rounded-xl border-2 ">
                <Text className="">{message.content}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  } else {
    return (
      <View className="items-center">
        <View className=" mx-2 my-2 px-2 py-2 rounded-xl border-2">
          <Text className="">{message.content}</Text>
        </View>
      </View>
    );
  }
};
