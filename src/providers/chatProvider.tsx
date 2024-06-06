import Config from 'react-native-config';
import TextEncodingPolyfill from 'text-encoding';
import StompJs, { Message } from '@stomp/stompjs';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useRef, useEffect, useContext, createContext } from 'react';

import LoadingComponent from '@components/Common/Loading';

import { roomState, chatInState, messagesState, memberIdState } from '@recoil/recoil';

import { getMyChatInfo } from '@server/api/chat';

import { useAccessToken } from '@hooks/token';

import { InfoToastMessage } from '@utils/toastMessage';

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
    sendMessage: (inputMessage: string, type: string) => void;
    stompClient: any;
  },
);

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children }: any) {
  const stompClient = useRef<any>({});
  const chatIn = useRecoilValue(chatInState);
  const [, setMessages] = useRecoilState(messagesState);
  const [roomId, setRoomId] = useRecoilState(roomState);
  const [, setMemberId] = useRecoilState(memberIdState);
  const [accessToken] = useAccessToken();

  // 내가 접속하고 있는 방이 있는지 여부 확인
  useEffect(() => {
    (async () => {
      const response = await getMyChatInfo();
      const { roomId, memberId } = response;

      setRoomId(roomId);
      setMemberId(memberId);
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
    if (stompClient.current.connected) {
      return;
    }

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

      stompClient.current.onStompError = (error: any) => {
        const test = new TextDecoder('utf-8').decode(new Uint8Array(error._binaryBody));
        console.log(test);
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
  const sendMessage = (inputMessage: string, type: string) => {
    if (stompClient) {
      stompClient.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify({
          roomId: roomId,
          type: type,
          content: inputMessage,
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
      stompClient.current.deactivate();
    }
  };

  const handlers = {
    connect,
    disConnect,
    sendMessage,
    stompClient,
  };

  return <ChatContext.Provider value={handlers}>{children}</ChatContext.Provider>;
}
