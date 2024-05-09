import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { useChatContext } from 'src/providers/chatProvider';

const MessageInputBoxComponent: React.FC = () => {
  const { sendMessage } = useChatContext();

  const [inputMessage, setInputMessage] = useState<string>('');

  // 채팅 보내기
  const send = () => {
    if (inputMessage !== '') {
      sendMessage(inputMessage);
      setInputMessage('');

      //   if (scrollViewRef.current) {
      //     scrollViewRef.current.scrollToEnd({
      //       animated: true,
      //     });
      //   }
    }
  };

  return (
    <View className="flex-row items-center p-2 ">
      <TextInput
        className="mr-2 h-10 flex-1 rounded-md border-2 px-2"
        value={inputMessage}
        onChangeText={setInputMessage}
        placeholder="메시지를 입력하세요"
      />

      <Pressable
        className="flex h-10 items-center justify-center rounded-md border-2 px-2"
        onPress={send}
      >
        <Text>보내기</Text>
      </Pressable>
    </View>
  );
};

export default MessageInputBoxComponent;
