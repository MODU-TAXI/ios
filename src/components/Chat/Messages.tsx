import React, { useRef, useEffect } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';

import { MessageBoxComponent } from '@components/Chat/MessageBox';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface MessagesComponentProps {
  memberId: number;
  managerId: number;
  messages: ChatMessage[];
  newMessages: ChatMessage[];
  openUserInfoModal: (user: UserPreview) => void;
  openImageModal: (imageUrl: string) => void;
  toCalculateScreen: () => void;
  matchComplete: () => void;
  toPaymentScreen: () => void;
}

const MessagesComponent: React.FC<MessagesComponentProps> = ({
  memberId,
  managerId,
  messages,
  newMessages,
  openUserInfoModal,
  openImageModal,
  toCalculateScreen,
  matchComplete,
  toPaymentScreen,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

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
      className="bg-white px-4"
      ref={scrollViewRef}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      }}
    >
      {messages.map((chat, index) => (
        <View key={index} className="px-2">
          {/* 말풍선 */}
          <MessageBoxComponent
            message={chat}
            managerId={managerId}
            openUserInfoModal={openUserInfoModal}
            memberId={memberId}
            openImageModal={openImageModal}
            toCalculateScreen={toCalculateScreen}
            matchComplete={matchComplete}
            toPaymentScreen={toPaymentScreen}
          />
        </View>
      ))}

      {newMessages.map((chat, index) => (
        <View key={index} className="px-2">
          {/* 말풍선 */}
          <MessageBoxComponent
            message={chat}
            managerId={managerId}
            openUserInfoModal={openUserInfoModal}
            memberId={memberId}
            openImageModal={openImageModal}
            toCalculateScreen={toCalculateScreen}
            matchComplete={matchComplete}
            toPaymentScreen={toPaymentScreen}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default MessagesComponent;
