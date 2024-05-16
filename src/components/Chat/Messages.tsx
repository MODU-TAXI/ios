import React, { useRef, useEffect } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';

import { MessageBoxComponent } from '@components/Chat/MessageBox';

import { useGetMessages } from '@hooks/api/chat';

import { ChatMessage } from '@type/entity/chat';

interface MessagesComponentProps {
  roomId: number;
  memberId: number;
  newMessages: ChatMessage[];
  openUserInfoModal: () => void;
}

const MessagesComponent: React.FC<MessagesComponentProps> = ({
  roomId,
  memberId,
  newMessages,
  openUserInfoModal,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { messages } = useGetMessages(roomId);

  // 키보드 밑으로 내리기 위함
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // 키보드가 내려가면 아무 동작 없음
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView
      className="bg-gray-100 px-4"
      ref={scrollViewRef}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      }}
    >
      {messages.messages.map((chat, index) => (
        <View key={index} className="px-2">
          {/* 말풍선 */}
          <MessageBoxComponent
            message={chat}
            openUserInfoModal={openUserInfoModal}
            memberId={memberId}
          />
        </View>
      ))}

      {newMessages.map((chat, index) => (
        <View key={index} className="px-2">
          {/* 말풍선 */}
          <MessageBoxComponent
            message={chat}
            openUserInfoModal={openUserInfoModal}
            memberId={memberId}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default MessagesComponent;
