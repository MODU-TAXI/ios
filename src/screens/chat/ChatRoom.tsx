import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextEncodingPolyfill from 'text-encoding';

import { useChatContext } from 'src/providers/chatProvider';
import { getChatMessages } from '@server/api/chat';

import { useRecoilState } from 'recoil';
import { chatInState, chatState, memberIdState } from '@recoil/recoil';
import { getAccessToken } from '@utils/token';
import HeaderComponent from '@components/Header';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

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

const ChatRoomScreen: React.FC = () => {
  const { sendMessage } = useChatContext();
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatIn, setChatIn] = useRecoilState(chatInState); // 타입 추가
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const [originMessages, setOriginMessages] = useState<MessageBody[]>([]);
  const [chat, setChat] = useRecoilState(chatState);
  const [token, setToken] = useState<string>('');

  // 웹소켓용 token 추출
  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();

      if (accessToken) {
        setToken(accessToken);
      }
    })();
  }, []);

  // 채팅스크린에 있을때는 알람안오게 해야하므로 recoil로 상태 저장
  useEffect(() => {
    setChatIn(true);

    return () => setChatIn(false);
  }, []);

  // 채팅 가져오는 함수
  const getChat = async () => {
    try {
      const response = await getChatMessages(2);

      setOriginMessages(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 원래 채팅들 가져오기
  useEffect(() => {
    getChat();
  }, []);

  // 채팅 보내기
  const send = () => {
    if (inputMessage !== '') {
      sendMessage(inputMessage);
      setInputMessage('');

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({
          animated: true,
        });
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // 키보드가 내려가면 아무 동작 없음
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const RenderItem: React.FC<{ item: MessageBody }> = ({ item }) => {
    // 타입 추가
    if (item.messageType === 'CHAT') {
      if (item.memberId === memberId) {
        return (
          <View className="items-end mt-2">
            <View className="flex-row">
              {/* 이름 + 채팅 */}
              <View className="flex-col mr-2">
                {/* 이름 */}
                <View className="items-end">
                  <Text>{item.sender}</Text>
                </View>

                {/* 채팅 */}
                <View className="px-2 py-2 rounded-xl border-2 ">
                  <Text className="">{item.content}</Text>
                </View>
              </View>

              {/* 프로필 이미지 */}
              <View className="w-10 h-10 rounded-full border-2 p-2"></View>
            </View>
          </View>
        );
      } else {
        return (
          <View className="items-start mt-2 ">
            <View className="flex-row">
              {/* 프로필 이미지 */}
              <View className="w-10 h-10 rounded-full border-2 p-2"></View>

              {/* 이름 + 채팅 */}
              <View className="flex-col ml-2">
                {/* 이름 */}
                <View>
                  <Text>{item.sender}</Text>
                </View>

                {/* 채팅 */}
                <View className="px-2 py-2 rounded-xl border-2 ">
                  <Text className="">{item.content}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View className="items-center">
          <View className=" mx-2 my-2 px-2 py-2 rounded-xl border-2">
            <Text className="">{item.content}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <HeaderComponent title={'채팅 페이지'} />
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView
          key={chat.length.toString()} // 키 추가
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: false });
            }
          }}
        >
          {originMessages.map((chat, index) => (
            <View key={index} className="px-2">
              <RenderItem item={chat} />
            </View>
          ))}

          {chat.map((chat, index) => (
            <View key={index} className="px-2">
              <RenderItem item={chat} />
            </View>
          ))}
        </ScrollView>

        <View className="flex-row items-center px-2 py-2 ">
          <TextInput
            className="flex-1 h-10 border-2 rounded-md px-2 mr-2"
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="메시지를 입력하세요"
          />

          <Pressable
            className="h-10 rounded-md border-2 flex items-center justify-center px-2"
            onPress={send}
          >
            <Text>보내기</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
