import { SetterOrUpdater } from 'recoil';
import { Asset } from 'react-native-image-picker';
import { View, Alert, TextInput, Pressable } from 'react-native';
import React, { useRef, Dispatch, useState, SetStateAction } from 'react';

import { useChatContext } from 'src/providers/chatProvider';

import { MessageBody } from '@recoil/type';

import { openAlbum, openCamera } from '@utils/image';

import Plus from '@assets/images/Chat/Plus.svg';
import SendButton from '@assets/images/Chat/SendButton.svg';

interface MessageInputBoxComponentProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const MessageInputBoxComponent: React.FC<MessageInputBoxComponentProps> = ({ setLoading }) => {
  const { sendMessage } = useChatContext();
  const textInputRef = useRef<TextInput>(null);

  const [inputMessage, setInputMessage] = useState<string>('');

  // 텍스트 채팅 보내기
  const sendText = () => {
    if (inputMessage !== '') {
      sendMessage(inputMessage, 'CHAT');
      setInputMessage('');
    }
  };

  // 이미지 채팅 보내기
  const sendImage = (imgUrl: string | null) => {
    if (imgUrl) {
      sendMessage(imgUrl, 'IMAGE');
    }
  };

  // 이미지 고르기
  const selectImage = (): void => {
    return Alert.alert('뭘로 올릴래?', '선택해', [
      {
        text: '카메라로 찍기',
        onPress: async () => {
          setLoading(true);
          const image = await openCamera();
          sendImage(image);
          setLoading(false);
        },
      },
      {
        text: '앨범에서 선택',
        onPress: async () => {
          const image = await openAlbum();
          sendImage(image);
        },
      },
    ]);
  };

  const focusTextInput = () => {
    textInputRef.current?.focus();
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

        <Pressable onPress={sendText} className="absolute bottom-0 right-0 p-3">
          <SendButton />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MessageInputBoxComponent;
