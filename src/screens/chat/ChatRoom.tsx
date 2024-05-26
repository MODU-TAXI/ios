import React, { useState } from 'react';
import TextEncodingPolyfill from 'text-encoding';
import ImageView from 'react-native-image-viewing';
import { KeyboardAvoidingView } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import UserModalComponent from '@components/Chat/UserModal';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';

import { memberIdState, messagesState } from '@recoil/recoil';

import { useEnterChatRoom } from '@hooks/chat';
import { useGetRoomPreview } from '@hooks/api/rooms';

import { ChatRoomScreenProps } from '@type/param/loginStack';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomScreen = ({ route }: ChatRoomScreenProps) => {
  const { roomId } = route.params;

  const { roomPreview } = useGetRoomPreview(roomId);

  const [newMessages, setNewMeesages] = useRecoilState(messagesState);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 유저 인포 모달
  const [imageModalVisible, setImageModalVisible] = useState(false); // 이미지 뷰 모달
  const [viewImages, setViewImages] = useState([{ uri: '' }]);
  const memberId = useRecoilValue(memberIdState);

  useEnterChatRoom(); // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장

  // 이미지 뷰 모달 열기
  const openImageModal = (imageUrl: string) => {
    setImageModalVisible(true);
    setViewImages([{ uri: imageUrl }]);
  };

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
      <HeaderComponent title={'채팅 페이지'} clearMessages={clearMessages} />

      <ImageView
        images={viewImages}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />

      {/* 방 정보 Component */}
      <RoomInfoComponent roomPreview={roomPreview} />

      <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
        {/* 메세지 Component */}
        <MessagesComponent
          roomId={roomId}
          memberId={memberId}
          openUserInfoModal={openUserInfoModal}
          newMessages={newMessages}
          openImageModal={openImageModal}
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
