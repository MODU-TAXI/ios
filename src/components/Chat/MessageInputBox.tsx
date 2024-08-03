import React, { useRef, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';

import Plus from '@assets/images/Chat/Plus.svg';
import SendButton from '@assets/images/Chat/SendButton.svg';

interface MessageInputBoxComponentProps {
  sendMessage: (inputMessage: string, type: string) => void;
  openSelectImageModal: () => void;
}

const MessageInputBoxComponent: React.FC<MessageInputBoxComponentProps> = ({
  sendMessage,
  openSelectImageModal,
}) => {
  const textInputRef = useRef<TextInput>(null);

  const [inputMessage, setInputMessage] = useState<string>('');

  // 텍스트 채팅 보내기
  const sendText = () => {
    if (inputMessage !== '') {
      sendMessage(inputMessage, 'CHAT');
      setInputMessage('');
    }
  };

  const focusTextInput = () => {
    textInputRef.current?.focus();
  };

  return (
    <View className="flex-row items-center justify-center bg-white px-8 py-2 ">
      <Pressable className="p-3" onPress={openSelectImageModal}>
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
            maxLength={200}
            placeholderTextColor="#AFAFAF"
            style={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
          />
        </View>

        <Pressable onPress={sendText} className="absolute bottom-0 right-0 p-3">
          <SendButton />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MessageInputBoxComponent;
