import React from 'react';
import { View, Text } from 'react-native';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

import Card from '@assets/images/Toast/Card.svg';
import Chat from '@assets/images/Toast/Chat.svg';
import Check from '@assets/images/Toast/Check.svg';
import Error from '@assets/images/Toast/Error.svg';
import CompleteMatchText from '@assets/images/Toast/CompleteMatchText.svg';
import RegisterAdvanceText from '@assets/images/Toast/RegisterAdvanceText.svg';

// Custom props type for tomatoToast
interface InfoToastProps extends ToastConfigParams<any> {
  props: {
    content: string;
  };
}

interface ErrorToastProps extends ToastConfigParams<any> {
  props: {
    message: string;
  };
}

export const toastConfig: ToastConfig = {
  infoToast: ({ props }: InfoToastProps) => (
    <View
      className="w-[326px] flex-row items-center justify-center rounded-2xl px-2 py-4"
      style={{ backgroundColor: 'rgba(75,75,75,0.55)' }}
    >
      <Check className="mr-2" />
      <Text className="text-center font-medium tracking-tight text-white">{props.content}</Text>
    </View>
  ),

  errorToast: ({ props }: ErrorToastProps) => (
    <View
      className="w-[326px] flex-row items-center justify-center rounded-2xl px-2 py-4"
      style={{ backgroundColor: 'rgba(75,75,75,0.55)' }}
    >
      <Error className="mr-2" />
      <Text className="text-center font-medium tracking-tight text-white">{props.message}</Text>
    </View>
  ),

  startChatToast: () => (
    <View
      className="w-[326px] flex-row items-center justify-center rounded-2xl px-2 py-4"
      style={{ backgroundColor: 'rgba(75,75,75,0.55)' }}
    >
      <Chat className="mr-2" />
      <Text className="text-center font-medium tracking-tight text-white">
        채팅을 시작해보세요!
      </Text>
    </View>
  ),

  registerAccountToast: () => (
    <View
      className="w-[326px] flex-row items-center justify-center rounded-2xl px-2 py-4"
      style={{ backgroundColor: 'rgba(75,75,75,0.55)' }}
    >
      <Card className="mr-2" />
      <Text className="text-center font-medium tracking-tight text-white">정산계좌를 </Text>
      <RegisterAdvanceText />
      <Text className="text-center font-medium tracking-tight text-white">할 수 있어요!</Text>
    </View>
  ),

  completeRegisterAccountToast: () => (
    <View
      className="w-[326px] flex-row items-center justify-center rounded-2xl px-2 py-4"
      style={{ backgroundColor: 'rgba(75,75,75,0.55)' }}
    >
      <Card className="mr-2" />
      <Text className="text-center font-medium tracking-tight text-white">
        계좌등록이 완료되었어요!
      </Text>
    </View>
  ),

  completeMatchToast: () => (
    <View
      className="w-[326px] flex-row items-center justify-center rounded-2xl px-2 py-4"
      style={{ backgroundColor: 'rgba(75,75,75,0.55)' }}
    >
      <Card className="mr-2" />
      <CompleteMatchText />
      <Text className="text-center font-medium tracking-tight text-white">를 눌러주세요</Text>
    </View>
  ),
};
