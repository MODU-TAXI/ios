import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextEncodingPolyfill from 'text-encoding';
import HeaderComponent from '@components/Header';

import { useEnterChatRoom } from '@hooks/chat';

import MessagesComponent from '@components/Chat/Messages';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomScreen: React.FC = () => {
  // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장
  useEnterChatRoom();

  return (
    <SafeAreaView className="flex-1">
      <HeaderComponent title={'채팅 페이지'} />
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        {/* 채팅 Messages */}
        <MessagesComponent />

        {/* 채팅 입력 Box */}
        <MessageInputBoxComponent />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
