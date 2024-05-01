import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { getAccessToken } from '@utils/token';
import StompJs, { Client, Message } from '@stomp/stompjs';
import TextEncodingPolyfill from 'text-encoding';
import { getMyChatInfo } from '@server/api/chat';
import { useRecoilState } from 'recoil';
import { chatInState, chatState, memberIdState } from '@recoil/recoil';
import { InfoToastMessage } from '@utils/toastMessage';
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
    onMessageReceived: (message: Message) => void;
  },
);

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children }: any) {
  const [chatIn, setChatIn] = useRecoilState(chatInState);
  const [chat, setChat] = useRecoilState(chatState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [roomId, setRoomId] = useState<number>();
  const [accessToken, setAccessToken] = useState<string>('');

  const getMyRoom = async () => {
    try {
      const token = await getAccessToken();

      if (token) {
        setAccessToken(token);
      }

      const { memberId, roomId } = await getMyChatInfo();

      setMemberId(memberId); // memberId 저장

      setRoomId(2); // 들어갈룸 Id
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyRoom();
  }, []);

  useEffect(() => {
    if (roomId && roomId > 0) {
      connect(roomId);
    }

    return () => {
      if (roomId && roomId > 0) {
        disConnect();
      }
    };
  }, [roomId]);

  const stompClient = useRef<any>({});

  const connect = async (roomId: number) => {
    if (accessToken) {
      stompClient.current = new StompJs.Client({
        brokerURL: Config.SOCKET_URL,
        connectHeaders: {
          token: accessToken,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 500000,
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

  useEffect(() => {
    stompClient.current.chatIn = chatIn;
  }, [chatIn]);

  const onMessageReceived = (message: Message) => {
    const decodedMessage: MessageBody = JSON.parse(message.body);

    console.log(decodedMessage);

    if (stompClient.current.chatIn) {
      setChat((prev) => [...prev, decodedMessage]);
    } else {
      InfoToastMessage(decodedMessage.content);
    }
  };

  const sendMessage = (inputMessage: string) => {
    if (stompClient) {
      stompClient.current.publish({
        destination: '/pub/chat',
        body: JSON.stringify({
          roomId: roomId,
          type: 'CHAT',
          content: inputMessage,
          sender: '',
          token: accessToken,
        }),
        headers: {
          token: accessToken,
        },
      });
    }
  };

  const disConnect = () => {
    if (stompClient && roomId) {
      stompClient.current.deactivate();
    }
  };

  const handlers = {
    connect,
    disConnect,
    onMessageReceived,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={handlers}>{children}</ChatContext.Provider>
  );
}
