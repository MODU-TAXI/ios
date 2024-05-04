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
import { chatInState, memberIdState, messagesState } from '@recoil/recoil';
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
  const [accessToken] = useAccessToken();
  const [roomId, setRoomId] = useState<number>(0);
  const [, setMemberId] = useRecoilState(memberIdState);

  useEffect(() => {
    (async () => {
      const response = await getMyChatInfo();
      const { memberId, roomId } = response;

      if (memberId && roomId) {
        setMemberId(memberId);
        setRoomId(roomId);
      }
    })();
  }, []);

  // 만약 내가 들어간 방이 있었을 경우메만 입장
  useEffect(() => {
    if (accessToken && roomId && roomId > 0) {
      connect(roomId);
    }

    return () => disConnect();
  }, [roomId, accessToken]);

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
      stompClient.current.activate();
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
    if (stompClient && roomId && roomId > 0) {
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
