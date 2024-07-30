import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Linking, Pressable } from 'react-native';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

import Card from '@assets/images/Toast/Card.svg';
import Chat from '@assets/images/Toast/Chat.svg';
import Check from '@assets/images/Toast/Check.svg';
import Error from '@assets/images/Toast/Error.svg';
import ModutaxiBotImage from '@assets/images/Common/ModutaxiBotImage.svg';
import CompleteMatchText from '@assets/images/Toast/CompleteMatchText.svg';
import RegisterAdvanceText from '@assets/images/Toast/RegisterAdvanceText.svg';

// 모두의 택시 봇 토스트 메세지
interface fcmChatBotToastProps extends ToastConfigParams<any> {
  props: {
    body: string;
    deeplink: string;
  };
}

// fcm 채팅 토스트 메세지
interface fcmChatToastProps extends ToastConfigParams<any> {
  props: {
    title: string;
    body: string;
    imageUrl: string;
    deeplink: string;
  };
}

// fcm 토스트 메세지
interface fcmToastProps extends ToastConfigParams<any> {
  props: {
    message: string;
    deeplink: string;
  };
}

// 인포 토스트 메세지
interface InfoToastProps extends ToastConfigParams<any> {
  props: {
    content: string;
  };
}

// 에러 토스트 메세지
interface ErrorToastProps extends ToastConfigParams<any> {
  props: {
    message: string;
  };
}

export const toastConfig: ToastConfig = {
  fcmChatBotToast: ({ props }: fcmChatBotToastProps) => (
    <Pressable
      onPress={async () => {
        await Linking.openURL(props.deeplink);
        Toast.hide();
      }}
      className="w-[360px] flex-row items-center rounded-2xl p-4"
      style={{ backgroundColor: 'rgba(42, 34, 34, 0.62)' }}
    >
      <ModutaxiBotImage className="mr-4" />

      <View className="flex-col">
        <Text className="text-[16px] font-semibold tracking-tight text-white">모두의택시 봇</Text>

        <Text className="mt-1 text-[16px] font-semibold tracking-tight text-white">
          {props.body}
        </Text>
      </View>
    </Pressable>
  ),

  fcmChatToast: ({ props }: fcmChatToastProps) => (
    <Pressable
      onPress={async () => {
        await Linking.openURL(props.deeplink);
        Toast.hide();
      }}
      className="w-[360px] flex-row items-center rounded-2xl p-4"
      style={{ backgroundColor: 'rgba(42, 34, 34, 0.62)' }}
    >
      <FastImage
        className="mr-4 h-[42px] w-[42px] rounded-full"
        source={{
          uri: props.imageUrl,
        }}
      />

      <View className="flex-col">
        <Text className="text-[16px] font-semibold tracking-tight text-white">{props.title}</Text>

        <Text className="mt-1 text-[16px] font-semibold tracking-tight text-white">
          {props.body}
        </Text>
      </View>
    </Pressable>
  ),

  fcmToast: ({ props }: fcmToastProps) => (
    <Pressable
      onPress={async () => {
        await Linking.openURL(props.deeplink);
        Toast.hide();
      }}
      className="w-[343px] flex-row items-center justify-center rounded-xl p-4"
      style={{ backgroundColor: 'rgba(42, 34, 34, 0.62)' }}
    >
      <Text className="text-[16px] font-semibold tracking-tight text-white">{props.message}</Text>
    </Pressable>
  ),

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
