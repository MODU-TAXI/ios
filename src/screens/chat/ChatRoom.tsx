import { useRecoilValue } from 'recoil';
import Config from 'react-native-config';
import TextEncodingPolyfill from 'text-encoding';
import StompJs, { Message } from '@stomp/stompjs';
import ImageView from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, AppState, KeyboardAvoidingView } from 'react-native';
import React, { useRef, Suspense, useState, useEffect, useCallback } from 'react';

import HeaderComponent from '@components/Header';
import MessagesComponent from '@components/Chat/Messages';
import RoomInfoComponent from '@components/Chat/RoomInfo';
import LoadingComponent from '@components/Common/Loading';
import UserModalComponent from '@components/Chat/UserModal';
import SelectImageModal from '@components/Common/SelectImageModal';
import ChatErrorBoundary from '@components/Fallback/ChatErrorBoundary';
import MessageInputBoxComponent from '@components/Chat/MessageInputBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { MessageBody } from '@recoil/type';
import { userInfoState } from '@recoil/recoil';

import { refreshAccessToken } from '@server/api/member';

import { useAccessToken } from '@hooks/token';
import { useEnterChatRoom } from '@hooks/chat';
import { useChatDetail } from '@hooks/api/chat';
import { useMatchComplete } from '@hooks/api/rooms';

import { openAlbum, openCamera } from '@utils/image';
import { setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

import { UserPreview } from '@type/entity/user';
import { ChatRoomScreenProps } from '@type/param/loginStack';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const ChatRoomComponent = ({ navigation, route }: ChatRoomScreenProps) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const { roomId, managerId } = route.params;

  const { roomPreview, messages, messagesRefetch } = useChatDetail(roomId);

  const { mutateAsync: matchComplete, isPending: matchCompletePending } = useMatchComplete(roomId);

  const [newMessages, setNewMeesages] = useState<MessageBody[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 유저 인포 모달
  const [imageModalVisible, setImageModalVisible] = useState(false); // 이미지 뷰 모달
  const [selectImageModalVisible, setSelectImageModalVisible] = useState<boolean>(false); // 이미지 보내기 모달 뷰
  const [viewImages, setViewImages] = useState([{ uri: '' }]);
  const [userInfo, setUserInfo] = useState<UserPreview>();
  const [accessToken, setNewAccessToken] = useAccessToken(); // socket을 위한 token hook
  const myInfo = useRecoilValue(userInfoState);

  useEnterChatRoom(); // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장

  const stompClient = useRef<any>({});

  // 메세지 보내기
  const sendMessage = (inputMessage: string, type: string) => {
    try {
      if (stompClient.current.connected) {
        stompClient.current.publish({
          destination: '/pub/chat',
          body: JSON.stringify({
            roomId: roomId,
            memberId: myInfo.id,
            type: type,
            content: inputMessage,
            imageUrl: myInfo.imageUrl,
          }),
        });
      } else {
        // 여기다 저장해놨다가 connect되면 한번에 send?
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 메세지 초기화
  const clearMessages = useCallback(() => {
    setNewMeesages([]);
  }, [setNewMeesages]);

  // 메세지 받기
  const onMessageReceived = (message: Message) => {
    const newMessage: MessageBody = JSON.parse(message.body);

    setNewMeesages((prev: MessageBody[]) => [...prev, newMessage]);
  };

  // socket 연결 해제
  const disConnect = () => {
    if (stompClient.current.activate) {
      stompClient.current.deactivate();
      console.log('Socket 연결 해제!');
    }
  };

  const connect = () => {
    if (accessToken) {
      // 이미 connect 되어 있을때는 안되게 함
      if (stompClient.current && stompClient.current.connected) {
        return;
      }

      stompClient.current = new StompJs.Client({
        brokerURL: Config.SOCKET_URL,
        connectHeaders: {
          token: accessToken,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 500,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.activate();

      stompClient.current.onConnect = () => {
        stompClient.current.subscribe(`/sub/chat/${roomId}`, onMessageReceived, {
          headers: {
            token: accessToken,
          },
        });
      };

      stompClient.current.onStompError = async (error: any) => {
        const stompError = new TextDecoder('utf-8').decode(new Uint8Array(error._binaryBody));
        console.log('stompError:', stompError);

        // 존재하지 않은 방인 경우
        if (stompError == 'SOCK_ROOM_003') {
          disConnect();
          Alert.alert(
            'ROOM ERROR',
            '존재하지 않는 방입니다.',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainScreen' }],
                  }),
              },
            ],
            { cancelable: false },
          );
        }

        // token 문제
        if (
          stompError == 'SOCK_AUTH_007' ||
          stompError == 'SOCK_AUTH_008' ||
          stompError == 'SOCK_AUTH_009' ||
          stompError == 'SOCK_AUTH_010'
        ) {
          disConnect();

          const refreshToken = await getRefreshToken();

          if (refreshToken) {
            const { tokenResponse } = await refreshAccessToken(refreshToken);

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenResponse;

            await Promise.all([setAccessToken(newAccessToken), setRefreshToken(newRefreshToken)]);

            setNewAccessToken(newAccessToken);

            connect();
          }
        }
      };
    }
  };

  // 화면을 다시켰을때 socket 연결
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        connect();
        clearMessages();
        messagesRefetch();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [accessToken, appState, clearMessages, messagesRefetch]);

  // 들어왔을때 socket 연결
  useEffect(() => {
    connect();
  }, [accessToken]);

  // 나갔을때 메세지 clear
  useEffect(() => {
    return () => {
      disConnect();
      clearMessages();
    };
  }, []);

  // 이미지 채팅 보내기
  const sendImage = (imageUrl: string | null) => {
    if (imageUrl) {
      sendMessage(imageUrl, 'IMAGE');
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
    const image = await openCamera();

    closeSelectImageModal();

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

  // 정산페이지로 이동
  const toCalculateScreen = () => {
    if (roomPreview) {
      navigation.navigate('AmountScreen', { roomPreview: roomPreview });
    }
  };

  // 신고페이지로 이동
  const toDeclarationScreen = () => {
    if (userInfo) {
      closeUserInfoModal();
      navigation.navigate('DeclarationScreen', { userInfo: userInfo, roomId: roomId });
    }
  };

  // 유저기준 - 정산하기 페이지로 이동
  const toPaymentScreen = () => {
    if (roomPreview) {
      navigation.navigate('CheckPaymentScreen', { roomPreview: roomPreview });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {matchCompletePending && <TransparentLoadingComponent />}

      <HeaderComponent title={'채팅 페이지'} />

      {/* 방 정보 Component */}
      {roomPreview && <RoomInfoComponent roomPreview={roomPreview} />}

      <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
        {/* 메세지 Component */}
        <MessagesComponent
          memberId={myInfo.id}
          managerId={managerId}
          newMessages={newMessages}
          messages={messages.messages}
          openUserInfoModal={openUserInfoModal}
          openImageModal={openImageModal}
          toCalculateScreen={toCalculateScreen}
          matchComplete={matchComplete}
          toPaymentScreen={toPaymentScreen}
        />

        {/* 입력창 Component */}
        <MessageInputBoxComponent
          sendMessage={sendMessage}
          openSelectImageModal={openSelectImageModal}
        />
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

      <ImageView
        images={viewImages}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
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
