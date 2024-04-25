import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StompJs from '@stomp/stompjs';
import TextEncodingPolyfill from 'text-encoding';

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzEzOTUzNDA1LCJleHAiOjE3MTM5NTcwMDV9.U8pWrFi8HSOVCOnkGpqORQLAT6akqeEpOxobaNpj-z4';

const client = new StompJs.Client({
  brokerURL: 'ws://165.246.158.58:8080/ws',
  connectHeaders: {
    token: token,
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 50000000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

function test(message: string) {
  console.log('message arrived: ', message);
}

client.onConnect = function (frame) {
  client.subscribe(`/sub/chat/10`, test, {
    headers: {
      token: token,
    },
  });
};

client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate();

const ChatRoomScreen = () => {
  useEffect(() => {
    client.subscribe(`/sub/chat/10`, test);
    setMessages((prevMessages) => [...prevMessages, '메세지 도착']);
  }, []);

  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    client.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        roomId: 10,
        type: 'CHAT',
        content: 'gd',
        sender: 'hun',
      }),
      headers: {
        token: token,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Pressable onPress={sendMessage}>
          <Text>보내기</Text>
        </Pressable>

        {messages.map((me) => {
          return (
            <View>
              <Text>{me}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
