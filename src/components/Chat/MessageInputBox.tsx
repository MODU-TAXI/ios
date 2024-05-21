import { SetterOrUpdater } from 'recoil';
import React, { useRef, useState } from 'react';
import { View, Alert, TextInput, Pressable } from 'react-native';

import { useChatContext } from 'src/providers/chatProvider';

import { MessageBody } from '@recoil/type';

import { openAlbum, openCamera } from '@utils/image';

import Plus from '@assets/images/Chat/Plus.svg';
import SendButton from '@assets/images/Chat/SendButton.svg';

interface MessageInputBoxComponentProps {
  setNewMeesages: SetterOrUpdater<MessageBody[]>;
}

const MessageInputBoxComponent: React.FC<MessageInputBoxComponentProps> = ({ setNewMeesages }) => {
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

  const selectImage = () => {
    Alert.alert('뭘로 올릴래?', '선택해', [
      {
        text: '카메라로 찍기',
        onPress: openCamera,
      },
      {
        text: '앨범에서 선택',
        onPress: openAlbum,
      },
    ]);
  };

  return (
    <View className="flex-row items-center justify-center bg-white px-8 py-2">
      <Pressable className="p-3" onPress={selectImage}>
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
