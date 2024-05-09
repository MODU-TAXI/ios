import React, {
  useEffect,
  useRef,
  createContext,
  useContext,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import TextEncodingPolyfill from 'text-encoding';
import StompJs, { Message } from '@stomp/stompjs';
import { chatInState, messagesState, roomState } from '@recoil/recoil';
import { InfoToastMessage } from '@utils/toastMessage';
import { useAccessToken } from '@hooks/token';
import { getMyChatInfo } from '@server/api/chat';
import Config from 'react-native-config';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

type MessageBody = {
  content: string;
  dateTime: Date;
  memberId: number;
  roomId: number;
  sender: string;
  messageType: 'JOIN' | 'CHAT' | 'LEAVE';
};

const ChatContext = createContext(
  {} as {
    connect: (roomId: number) => void;
    disConnect: () => void;
    sendMessage: (inputMessage: string) => void;
  },
);

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children }: any) {
  const stompClient = useRef<any>({});
  const [chatIn] = useRecoilState(chatInState);
  const [, setMessages] = useRecoilState(messagesState);
  const [roomId, setRoomId] = useRecoilState(roomState);
  const [accessToken] = useAccessToken();

  // 내가 접속하고 있는 방이 있는지 여부 확인
  useEffect(() => {
    (async () => {
      const response = await getMyChatInfo();
      const { roomId } = response;

      console.log('너', roomId, '번 방에있어');

      setRoomId(roomId);
    })();
  }, []);

  // 로그인하자마자 소켓 연결
  useEffect(() => {
    if (roomId > 0) {
      connect(roomId);
    }

    // 어플이 꺼질때 disconnect();
    return () => disConnect();
  }, [accessToken, roomId]);

  // 채팅방 입장했는지 여부 ref에 저장
  useEffect(() => {
    stompClient.current.chatIn = chatIn;
  }, [chatIn]);

  const connect = (roomId: number) => {
    if (accessToken) {
      stompClient.current = new StompJs.Client({
        brokerURL: Config.SOCKET_URL,
        connectHeaders: {
          token: accessToken,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.current.activate();

      stompClient.current.onConnect = () => {
        stompClient.current.subscribe(
          `/sub/chat/${roomId}`,
          onMessageReceived,
          {
            headers: {
              token: accessToken,
            },
          },
        );
      };
    }
  };

  // 메세지 받기
  const onMessageReceived = (message: Message) => {
    const decodedMessage: MessageBody = JSON.parse(message.body);

    if (stompClient.current.chatIn) {
      setMessages((prev: MessageBody[]) => [...prev, decodedMessage]);
    } else {
      InfoToastMessage(decodedMessage.content);
    }
  };

  // 메세지 보내기
  const sendMessage = (inputMessage: string) => {
    if (stompClient) {
      stompClient.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify({
          roomId: roomId,
          type: 'CHAT',
          content: inputMessage,
          sender: '',
        }),
        headers: {
          token: accessToken,
        },
      });
    }
  };

  // socket 연결 해제
  const disConnect = () => {
    if (stompClient.current.deactivate) {
      console.log('소켓 연결 종료');
      stompClient.current.deactivate();
    }
  };

  const handlers = {
    connect,
    disConnect,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={handlers}>{children}</ChatContext.Provider>
  );
}
