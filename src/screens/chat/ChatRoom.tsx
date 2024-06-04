import React, { useState } from 'react';
import TextEncodingPolyfill from 'text-encoding';
import ImageView from 'react-native-image-viewing';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, KeyboardAvoidingView } from 'react-native';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import UserModalComponent from '@components/Chat/UserModal';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';

import { memberIdState, messagesState } from '@recoil/recoil';

import { useEnterChatRoom } from '@hooks/chat';
import { useGetRoomPreview } from '@hooks/api/rooms';

import { UserPreview } from '@type/entity/user';
import { ChatRoomScreenProps } from '@type/param/loginStack';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomScreen = ({ navigation, route }: ChatRoomScreenProps) => {
  const { roomId } = route.params;

  const { roomPreview } = useGetRoomPreview(roomId);

  const [newMessages, setNewMeesages] = useRecoilState(messagesState);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 유저 인포 모달
  const [imageModalVisible, setImageModalVisible] = useState(false); // 이미지 뷰 모달
  const [viewImages, setViewImages] = useState([{ uri: '' }]);
  const [userInfo, setUserInfo] = useState<UserPreview>();
  const memberId = useRecoilValue(memberIdState);

  useEnterChatRoom(); // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장

  // 이미지 뷰 모달 열기
  const openImageModal = (imageUrl: string) => {
    setImageModalVisible(true);
    setViewImages([{ uri: imageUrl }]);
  };

  // 유저 인포 모달 열기
  const openUserInfoModal = (user: UserPreview) => {
    setUserInfo(user);
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

  // 정산페이지로 이동
  const toCalculateScreen = () => {
    if (roomPreview) {
      navigation.navigate('CheckDepartureScreen', { roomPreview: roomPreview });
    }
  };

  // 신고페이지로 이동
  const toDeclarationScreen = () => {
    if (userInfo) {
      closeUserInfoModal();
      navigation.navigate('DeclarationScreen', { userInfo: userInfo! });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title={'채팅 페이지'} clearMessages={clearMessages} />

      <Pressable onPress={toCalculateScreen}>
        <Text>정산 페이지로 이동</Text>
      </Pressable>

      <ImageView
        images={viewImages}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />

      {/* 방 정보 Component */}
      {roomPreview && <RoomInfoComponent roomPreview={roomPreview} />}

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
      {userInfo && (
        <UserModalComponent
          userInfo={userInfo}
          modalVisible={modalVisible}
          closeUserInfoModal={closeUserInfoModal}
          toDeclarationScreen={toDeclarationScreen}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
