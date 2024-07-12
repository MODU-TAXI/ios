import FastImage from 'react-native-fast-image';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import LastMessageComponent from './LastMessageComponent';

import { MessageBoxComponent } from '@components/Chat/MessageBox';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

import ScrollBottomButton from '@assets/images/Chat/ScrollBottomButton.svg';

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
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollBottomButtonVisible, setScrollBottomButtonVisible] = useState(false);
  const [lastMessageVisible, setLastMessageVisible] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
  };

  const toBottom = () => {
    if (flatListRef.current) {
      setLastMessageVisible(false);
      setScrollBottomButtonVisible(false);
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  };

  useEffect(() => {
    if (scrollOffset > 500) {
      // 새로운 메세지가 들어온 경우
      if (messages.length > 0 && messages[0].memberId != memberId) {
        return setLastMessageVisible(true);
      } else {
        setScrollBottomButtonVisible(true);
        setLastMessageVisible(false);
      }
    } else {
      setLastMessageVisible(false);
      setScrollBottomButtonVisible(false);
    }
  }, [scrollOffset, messages]);

  // 내가 채팅 입력했을때만 밑으로 내리기
  useEffect(() => {
    if (messages.length === 0) return;

    if (messages[0].memberId == memberId) {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      }
    }
  }, [messages]);

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
    <View className="flex-1 bg-white">
      <FlatList
        className="bg-white px-4"
        ref={flatListRef}
        data={messages}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        inverted={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      />

      {scrollBottomButtonVisible && !lastMessageVisible && (
        <ScrollBottomButton onPress={toBottom} className="absolute bottom-0 right-3 p-4" />
      )}

      {messages.length > 0 && lastMessageVisible && (
        <LastMessageComponent toBottom={toBottom} lastMessage={messages[0]} />
      )}
    </View>
  );
};

export default MessagesComponent;
