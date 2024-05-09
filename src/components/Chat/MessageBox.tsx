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
        <View className="mt-2 items-end">
          <View className="flex-row">
            {/* 이름 + 채팅 */}
            <View className="mr-2 flex-col">
              {/* 이름 */}
              <View className="items-end">
                <Text>{message.sender}</Text>
              </View>

              {/* 채팅 */}
              <View className="rounded-xl border-2 p-2 ">
                <Text className="">{message.content}</Text>
              </View>
            </View>

            {/* 프로필 이미지 */}
            <View className="size-10 rounded-full border-2 p-2"></View>
          </View>
        </View>
      );
    } else {
      return (
        <View className="mt-2 items-start ">
          <View className="flex-row">
            {/* 프로필 이미지 */}
            <View className="size-10 rounded-full border-2 p-2"></View>

            {/* 이름 + 채팅 */}
            <View className="ml-2 flex-col">
              {/* 이름 */}
              <View>
                <Text>{message.sender}</Text>
              </View>

              {/* 채팅 */}
              <View className="rounded-xl border-2 p-2 ">
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
        <View className=" m-2 rounded-xl border-2 p-2">
          <Text className="">{message.content}</Text>
        </View>
      </View>
    );
  }
};
