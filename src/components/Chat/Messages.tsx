import { useRecoilState } from 'recoil';
import React, { useRef, useEffect } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';

import { MessageBoxComponent } from '@components/Chat/MessageBox';

import { messagesState } from '@recoil/recoil';

import { useGetMessages } from '@hooks/api/chat';

interface MessagesComponentProps {
  roomId: number;
  openUserInfoModal: () => void;
}

const tempMessages = [
  {
    roomId: 1,
    messageType: 'JOIN',
    content: 'John has joined the chat',
    sender: 'System',
    memberId: 123,
    dateTime: new Date('2024-05-15T10:00:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content:
      'Hello everyone! aiowenfliawbefliabwelfiabwelfibuawleifubalwieubfaliwuebflaiwubefliaubwef',
    sender: 'John',
    memberId: 123,
    dateTime: new Date('2024-05-15T10:01:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content:
      'Hello everyone! aiowenfliawbefliabwelfiabwelfibuawleifubalwieubfaliwuebflaiwubefliaubwef',
    sender: 'Alice',
    memberId: 456,
    dateTime: new Date('2024-05-15T10:01:30Z'),
  },
  {
    roomId: 1,
    messageType: 'LEAVE',
    content: 'Alice has left the chat',
    sender: 'System',
    memberId: 456,
    dateTime: new Date('2024-05-15T10:05:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content: "Looks like Alice left. It's just us now.",
    sender: 'John',
    memberId: 123,
    dateTime: new Date('2024-05-15T10:06:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content: "No worries. Let's continue our discussion.",
    sender: 'John',
    memberId: 123,
    dateTime: new Date('2024-05-15T10:06:30Z'),
  },
  {
    roomId: 1,
    messageType: 'JOIN',
    content: 'Mike has joined the chat',
    sender: 'System',
    memberId: 789,
    dateTime: new Date('2024-05-15T10:10:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content: 'Hey guys, what did I miss?',
    sender: 'Mike',
    memberId: 789,
    dateTime: new Date('2024-05-15T10:11:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content: "No worries. Let's continue our discussion.",
    sender: 'John',
    memberId: 123,
    dateTime: new Date('2024-05-15T10:06:30Z'),
  },
  {
    roomId: 1,
    messageType: 'JOIN',
    content: 'Mike has joined the chat',
    sender: 'System',
    memberId: 789,
    dateTime: new Date('2024-05-15T10:10:00Z'),
  },
  {
    roomId: 1,
    messageType: 'CHAT',
    content: 'Hey guys, what did I miss?',
    sender: 'Mike',
    memberId: 789,
    dateTime: new Date('2024-05-15T10:11:00Z'),
  },
];

const MessagesComponent: React.FC<MessagesComponentProps> = ({ roomId, openUserInfoModal }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { messages } = useGetMessages(roomId);
  const [newMessages] = useRecoilState(messagesState);

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
          <MessageBoxComponent message={chat} openUserInfoModal={openUserInfoModal} />
        </View>
      ))}

      {newMessages.map((chat, index) => (
        <View key={index} className="px-2">
          {/* 말풍선 */}
          <MessageBoxComponent message={chat} openUserInfoModal={openUserInfoModal} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MessagesComponent;
