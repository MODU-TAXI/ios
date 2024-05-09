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
  );
};

export default MessageInputBoxComponent;
