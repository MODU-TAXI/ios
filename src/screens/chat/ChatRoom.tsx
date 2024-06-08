import TextEncodingPolyfill from 'text-encoding';
import ImageView from 'react-native-image-viewing';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useFocusEffect } from '@react-navigation/native';

import { useChatContext } from '@providers/chatProvider';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, AppState, KeyboardAvoidingView } from 'react-native';
import React, { Suspense, useState, useEffect, useCallback } from 'react';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import LoadingComponent from '@components/Common/Loading';
import UserModalComponent from '@components/Chat/UserModal';

import ChatErrorBoundary from '@components/Fallback/ChatErrorBoundary';

import SelectImageModal from '@components/Common/SelectImageModal';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';

import { memberIdState, messagesState } from '@recoil/recoil';

import { useEnterChatRoom } from '@hooks/chat';
import { useChatDetail } from '@hooks/api/chat';

import { openAlbum, openCamera } from '@utils/image';

import { UserPreview } from '@type/entity/user';
import { ChatRoomScreenProps } from '@type/param/loginStack';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomComponent = ({ navigation, route }: ChatRoomScreenProps) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const { roomId } = route.params;

  const { roomPreview, messages, messagesRefetch } = useChatDetail(roomId);

  const { sendMessage } = useChatContext();

  const [newMessages, setNewMeesages] = useRecoilState(messagesState);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 유저 인포 모달
  const [imageModalVisible, setImageModalVisible] = useState(false); // 이미지 뷰 모달
  const [selectImageModalVisible, setSelectImageModalVisible] = useState<boolean>(false); // 이미지 보내기 모달 뷰
  const [viewImages, setViewImages] = useState([{ uri: '' }]);
  const [userInfo, setUserInfo] = useState<UserPreview>();
  const memberId = useRecoilValue(memberIdState);

  useEnterChatRoom(); // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장

  // 이미지 채팅 보내기
  const sendImage = (imgUrl: string | null) => {
    if (imgUrl) {
      sendMessage(imgUrl, 'IMAGE');
    }
  };

  // 이미지 선택 모달 띄우기
  const openSelectImageModal = () => {
    setSelectImageModalVisible(true);
  };

  // 이미지 선택 모달 내리기
  const closeSelectImageModal = () => {
    setSelectImageModalVisible(false);
  };

  // 카메라로 이미지 고르기
  const selectImageFromCamera = async (): Promise<void> => {
    closeSelectImageModal();

    const image = await openCamera();

    if (image) {
      sendImage(image);
    }
  };

  // 앨범에서 이미지 고르기
  const selectImageFromAlbum = async (): Promise<void> => {
    closeSelectImageModal();

    const image = await openAlbum();

    if (image) {
      sendImage(image);
    }
  };

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
  const clearMessages = useCallback(() => {
    setNewMeesages([]);
  }, [setNewMeesages]);

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
      navigation.navigate('DeclarationScreen', { userInfo: userInfo });
    }
  };

  // 화면 껏다 켰을때 그동안 메세지 가져오기
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        clearMessages();
        messagesRefetch();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, clearMessages, messagesRefetch]);

  // 나갔을때 메세지 clear
  useEffect(() => {
    return () => clearMessages();
  }, [clearMessages]);

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
      {roomPreview && <RoomInfoComponent roomPreview={roomPreview} />}

      <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
        {/* 메세지 Component */}
        <MessagesComponent
          messages={messages.messages}
          memberId={memberId}
          openUserInfoModal={openUserInfoModal}
          newMessages={newMessages}
          openImageModal={openImageModal}
          toCalculateScreen={toCalculateScreen}
        />

        {/* 입력창 Component */}
        <MessageInputBoxComponent openSelectImageModal={openSelectImageModal} />
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

      <SelectImageModal
        modalVisible={selectImageModalVisible}
        closeSelectImageModal={closeSelectImageModal}
        selectImageFromCamera={selectImageFromCamera}
        selectImageFromAlbum={selectImageFromAlbum}
      />
    </SafeAreaView>
  );
};

const ChatRoomScreen = ({ route, navigation }: ChatRoomScreenProps) => {
  return (
    <ChatErrorBoundary navigation={navigation}>
      <Suspense fallback={<LoadingComponent />}>
        <ChatRoomComponent navigation={navigation} route={route} />
      </Suspense>
    </ChatErrorBoundary>
  );
};

export default ChatRoomScreen;
