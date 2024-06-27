import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface LeaveMessageBoxComponentProps {
  message: ChatMessage;
  openUserInfoModal: (user: UserPreview) => void;
}

const LeaveMessageBoxComponent: React.FC<LeaveMessageBoxComponentProps> = ({
  message,
  openUserInfoModal,
}) => {
  return (
    <Pressable
      className="my-2 flex-row items-center py-2"
      onPress={() =>
        openUserInfoModal({
          memberId: message.memberId,
          nickname: message.sender,
          imageUrl: message.imageUrl,
          thisIsMe: false,
        })
      }
    >
      <View className="h-[1px] flex-1 bg-gray-200" />
      <Text className="mx-2 text-[12px] font-normal text-gray-700">
        {message.sender}님이 매칭팟에서 퇴장했어요!
      </Text>
      <View className="h-[1px] flex-1 bg-gray-200" />
    </Pressable>
  );
};

export default LeaveMessageBoxComponent;
