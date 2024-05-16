import React from 'react';
import TextEncodingPolyfill from 'text-encoding';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';

import { useEnterChatRoom } from '@hooks/chat';

import { ChatRoomScreenProps } from '@type/param/loginStack';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
  const { roomDetail } = route.params;
  // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장
  useEnterChatRoom();

  return (
    <SafeAreaView className="flex-1 bg-white " edges={['top', 'left', 'right']}>
      <HeaderComponent title={'채팅 페이지'} />

      {/* 방 정보 Component */}
      <RoomInfoComponent roomDetail={roomDetail} />

      <KeyboardAvoidingView className="flex-1 bg-gray-100" behavior="padding">
        {/* 메세지 Component */}
        <MessagesComponent roomId={roomDetail.roomId} />

        {/* 입력창 Component */}
        <MessageInputBoxComponent />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
