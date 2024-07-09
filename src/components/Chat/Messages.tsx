import React, { useRef, useEffect } from 'react';
import { View, Keyboard, FlatList } from 'react-native';

import { MessageBoxComponent } from '@components/Chat/MessageBox';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface MessagesComponentProps {
  memberId: number;
  managerId: number;
  messages: ChatMessage[];
  openUserInfoModal: (user: UserPreview) => void;
  openImageModal: (imageUrl: string) => void;
  toCalculateScreen: () => void;
  matchComplete: () => void;
  toPaymentScreen: () => void;
}

const MessagesComponent: React.FC<MessagesComponentProps> = ({
  memberId,
  managerId,
  messages,
  openUserInfoModal,
  openImageModal,
  toCalculateScreen,
  matchComplete,
  toPaymentScreen,
}) => {
  const flatListRef = useRef<FlatList>(null);

  // 키보드 밑으로 내리기 위함
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // 키보드가 내려가면 아무 동작 없음
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderItem = ({ item, index }: { item: ChatMessage; index: number }) => (
    <View key={index} className="px-2">
      <MessageBoxComponent
        message={item}
        managerId={managerId}
        openUserInfoModal={openUserInfoModal}
        memberId={memberId}
        openImageModal={openImageModal}
        toCalculateScreen={toCalculateScreen}
        matchComplete={matchComplete}
        toPaymentScreen={toPaymentScreen}
      />
    </View>
  );

  return (
    <FlatList
      className="bg-white px-4"
      ref={flatListRef}
      data={messages}
      inverted={true}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
      }}
    />
  );
};

export default MessagesComponent;
