import React, { useState } from 'react';
import TextEncodingPolyfill from 'text-encoding';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Modal, Pressable, KeyboardAvoidingView } from 'react-native';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import UserModalComponent from '@components/Chat/UserModal';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';

import { memberIdState, messagesState } from '@recoil/recoil';

import { useEnterChatRoom } from '@hooks/chat';

import { ChatRoomScreenProps } from '@type/param/loginStack';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
  const { roomDetail } = route.params;

  const [newMessages, setNewMeesages] = useRecoilState(messagesState);

  const memberId = useRecoilValue(memberIdState);

  // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장
  useEnterChatRoom();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openUserInfoModal = () => {
    setModalVisible(true);
  };

  const closeUserInfoModal = () => {
    setModalVisible(false);
  };

  const claerMessages = () => {
    setNewMeesages([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white " edges={['top', 'left', 'right']}>
      <HeaderComponent title={'채팅 페이지'} claerMessages={claerMessages} />

      {/* 방 정보 Component */}
      <RoomInfoComponent roomDetail={roomDetail} />

      <KeyboardAvoidingView className="flex-1 bg-gray-100" behavior="padding">
        {/* 메세지 Component */}
        <MessagesComponent
          roomId={roomDetail.roomId}
          memberId={memberId}
          openUserInfoModal={openUserInfoModal}
          newMessages={newMessages}
        />

        {/* 입력창 Component */}
        <MessageInputBoxComponent />
      </KeyboardAvoidingView>

      {/* 유저 정보 modal */}
      <UserModalComponent modalVisible={modalVisible} closeUserInfoModal={closeUserInfoModal} />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
