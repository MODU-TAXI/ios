import React, { useRef, useState, useEffect } from 'react';
import { View, Keyboard, TextInput, Pressable, StyleSheet } from 'react-native';

import { useChatContext } from 'src/providers/chatProvider';

import Plus from '@assets/images/Chat/Plus.svg';
import SendButton from '@assets/images/Chat/SendButton.svg';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(144, 144, 144, 0.25)',
    shadowOffset: { width: 0, height: 2 }, // y-offset을 2로 설정
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});

const MessageInputBoxComponent: React.FC = () => {
  const { sendMessage } = useChatContext();
  const textInputRef = useRef<TextInput>(null);

  const [inputMessage, setInputMessage] = useState<string>('');

  // 채팅 보내기
  const send = () => {
    if (inputMessage !== '') {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const focusTextInput = () => {
    textInputRef.current?.focus();
  };

  return (
    <View className="flex-row items-center justify-center bg-white px-8 py-2">
      <Pressable className="p-3">
        <Plus />
      </Pressable>

      <Pressable
        onPress={focusTextInput}
        // style={styles.shadow}
        className="flex-row items-center rounded-3xl border-[1px] border-[#7C7C7C] bg-white px-4 py-3"
      >
        <View className="mr-8 flex-1">
          <TextInput
            ref={textInputRef}
            className="max-h-24 text-sm"
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="메시지를 입력하세요"
            multiline={true}
            placeholderTextColor="#AFAFAF"
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              textAlignVertical: 'top',
            }}
          />
        </View>

        <Pressable onPress={send} className="absolute bottom-0 right-0 p-3">
          <SendButton />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MessageInputBoxComponent;
