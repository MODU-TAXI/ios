import React, { useState } from 'react';
import TextEncodingPolyfill from 'text-encoding';
import { KeyboardAvoidingView } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import LoadingComponent from '@components/Common/Loading';
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

  const [loading, setLoading] = useState<boolean>(false);
  const [newMessages, setNewMeesages] = useRecoilState(messagesState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const memberId = useRecoilValue(memberIdState);

  useEnterChatRoom(); // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장

  // 유저 인포 모달 열기
  const openUserInfoModal = () => {
    setModalVisible(true);
  };

  // 유저 인포 모달 닫기
  const closeUserInfoModal = () => {
    setModalVisible(false);
  };

  // 메세지 초기화
  const clearMessages = () => {
    setNewMeesages([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {loading && <LoadingComponent />}

      <HeaderComponent title={'채팅 페이지'} clearMessages={clearMessages} />

      {/* 방 정보 Component */}
      <RoomInfoComponent roomDetail={roomDetail} />

      <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
        {/* 메세지 Component */}
        <MessagesComponent
          roomId={roomDetail.roomId}
          memberId={memberId}
          openUserInfoModal={openUserInfoModal}
          newMessages={newMessages}
        />

        {/* 입력창 Component */}
        <MessageInputBoxComponent setLoading={setLoading} />
      </KeyboardAvoidingView>

      {/* 유저 정보 modal */}
      <UserModalComponent modalVisible={modalVisible} closeUserInfoModal={closeUserInfoModal} />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
