import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { MessageBoxComponent } from '@components/Chat/MessageBox';
import { useRecoilState } from 'recoil';
import { messagesState } from '@recoil/recoil';
import { useGetMessages } from '@hooks/api/chat';

const MessagesComponent: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { messages } = useGetMessages(3);
  const [newMessages] = useRecoilState(messagesState);

  // 키보드 밑으로 내리기 위함
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // 키보드가 내려가면 아무 동작 없음
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView
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
          <MessageBoxComponent message={chat} memberId={1} />
        </View>
      ))}

      {newMessages.map((chat, index) => (
        <View key={index} className="px-2">
          {/* 말풍선 */}
          <MessageBoxComponent message={chat} memberId={1} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MessagesComponent;
