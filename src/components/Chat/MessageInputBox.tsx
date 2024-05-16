import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

import { useChatContext } from 'src/providers/chatProvider';

import Camera from '@assets/images/Chat/Camera.svg';
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

      //   if (scrollViewRef.current) {
      //     scrollViewRef.current.scrollToEnd({
      //       animated: true,
      //     });
      //   }
    }
  };

  const focusTextInput = () => {
    textInputRef.current?.focus();
  };

  return (
    <Pressable
      onPress={focusTextInput}
      style={styles.shadow}
      className="mx-[23px] mb-8 flex-row items-center rounded-3xl bg-white px-4 py-3"
    >
      <Camera className="mr-4" />

      <View className="mr-2 flex-1">
        <TextInput
          ref={textInputRef}
          className="text-sm"
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

      <SendButton onPress={send} />
    </Pressable>
  );
};

export default MessageInputBoxComponent;
