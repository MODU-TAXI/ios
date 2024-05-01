import StompJs, { Client, Message } from '@stomp/stompjs';
import TextEncodingPolyfill from 'text-encoding';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

type MessageBody = {
  content: string;
  roomId: number;
  sender: '[알리미]';
  token: string;
  type: 'JOIN' | 'CHAT';
};

// const token =
//   'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTksImlhdCI6MTcxNDI5NTY1NywiZXhwIjoxNzE0Mjk5MjU3fQ.40-z5nK_dgBJes9p7wB8nPv5G3geAFM8YsNGvyW86mM';

class StompClient {
  client: Client;
  token: string; // 토큰을 저장할 멤버

  constructor(token: string) {
    this.token = token;

    this.client = new StompJs.Client({
      brokerURL: 'ws://test.modutaxi.shop:8181/ws',
      connectHeaders: {
        token: this.token,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 500,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  connect() {
    this.client.activate();
    return this.token;
  }

  disconnect() {
    this.client.disconnect();
  }

  showMessage(message: Message): MessageBody {
    const decodedMessage = JSON.parse(message.body);
    return decodedMessage;
  }

  getMessage(roomId: number, callback: (messageBody: MessageBody) => void) {
    this.client.onConnect = () => {
      this.client.subscribe(
        `/sub/chat/${roomId}`,
        (message: Message) => {
          const decodedMessage = this.showMessage(message);
          callback(decodedMessage); // 받은 메시지를 콜백으로 전달
        },
        {
          headers: {
            token: this.token,
          },
        },
      );
    };
  }

  sendMessage(roomId: number, message: string) {
    this.client.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: roomId,
        type: 'CHAT',
        content: message,
        sender: '',
        token: this.token,
      }),
      headers: {
        token: this.token,
      },
    });
  }

  onStompError(callback: (frame: any) => void) {
    this.client.onStompError = (frame) => {
      callback(frame);
    };
  }
}

export default StompClient;
