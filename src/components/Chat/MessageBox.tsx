import React from 'react';
import { View } from 'react-native';

import JoinMessageBoxComponent from './JoinMessageBox';
import LeaveMessageBoxComponent from './LeaveMessageBox';
import MyChatMessageBoxComponent from './MyChatMessageBox';
import MyImageMessageBoxComponent from './MyImageMessageBox';
import PaymentMessageBoxComponent from './PaymentMessageBox';
import ChatBotMessageBoxComponent from './ChatBotMessageBox';
import CallTaxiMessageBoxComponent from './CallTaxiMessageBox';
import OthersChatMessageBoxComponent from './OthersChatMessageBox';
import OthersImageMessageBoxComponent from './OthersImageMessageBox';
import MatchCompleteMessageBoxComponent from './MatchCompleteMessageBox';
import PaymentRequestMessageBoxComponent from './PaymentRequestMessageBox';

import { ChatMessage } from '@type/entity/chat';
import { UserPreview } from '@type/entity/user';

interface MessageBoxComponentProps {
  message: ChatMessage;
  memberId: number;
  managerId: number;
  openUserInfoModal: (user: UserPreview) => void;
  openImageModal: (imageUrl: string) => void;
  toCalculateScreen: () => void;
  matchComplete: () => void;
  toPaymentScreen: () => void;
}

export const MessageBoxComponent: React.FC<MessageBoxComponentProps> = ({
  message,
  memberId,
  managerId,
  openUserInfoModal,
  openImageModal,
  toCalculateScreen,
  matchComplete,
  toPaymentScreen,
}) => {
  // Join message인 경우
  if (message.messageType === 'JOIN') {
    return <JoinMessageBoxComponent message={message} />;
  }

  // Leave message인 경우
  if (message.messageType === 'LEAVE') {
    return <LeaveMessageBoxComponent message={message} />;
  }

  if (message.messageType === 'CHAT') {
    // 내가 보낸 메세지일 경우
    if (message.memberId == memberId) {
      return <MyChatMessageBoxComponent message={message} />;
    } else {
      // 남이 보낸 메세지일 경우
      return (
        <OthersChatMessageBoxComponent message={message} openUserInfoModal={openUserInfoModal} />
      );
    }
  }

  if (message.messageType === 'IMAGE') {
    // 내가 보낸거
    if (message.memberId == memberId) {
      return <MyImageMessageBoxComponent message={message} openImageModal={openImageModal} />;
    } else {
      // 남이 보낸거
      return (
        <OthersImageMessageBoxComponent
          message={message}
          openUserInfoModal={openUserInfoModal}
          openImageModal={openImageModal}
        />
      );
    }
  }

  // 택시 부르러 가기
  if (message.messageType === 'CALL_TAXI' && memberId == managerId) {
    return <CallTaxiMessageBoxComponent message={message} />;
  }

  // 매칭 완료
  if (message.messageType === 'MATCHING_COMPLETE' && memberId == managerId) {
    return <MatchCompleteMessageBoxComponent message={message} matchComplete={matchComplete} />;
  }

  // 정산 요청하기
  if (message.messageType === 'PAYMENT_REQUEST' && memberId == managerId) {
    return (
      <PaymentRequestMessageBoxComponent message={message} toCalculateScreen={toCalculateScreen} />
    );
  }

  // 멤버가 보는 정산페이지
  if (message.messageType === 'PAYMENT_REQUEST_COMPLETE') {
    return <PaymentMessageBoxComponent message={message} toPaymentScreen={toPaymentScreen} />;
  }

  // 금액 알림
  if (message.messageType === 'CHAT_BOT') {
    return <ChatBotMessageBoxComponent message={message} />;
  }

  return <View></View>;
};
