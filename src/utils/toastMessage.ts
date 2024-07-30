import Toast from 'react-native-toast-message';

// 모두의택시 봇 토스트 메세지
export const fcmChatBotToastMessage = (body: string, deeplink: string): void => {
  return Toast.show({
    type: 'fcmChatBotToast',
    props: { body: body, deeplink: deeplink },
    position: 'top',
    visibilityTime: 4000,
  });
};

// fcm 인앱 채팅 토스트 메세지
export const fcmChatToastMessage = (
  title: string,
  body: string,
  imageUrl: string,
  deeplink: string,
): void => {
  return Toast.show({
    type: 'fcmChatToast',
    props: { title: title, body: body, imageUrl: imageUrl, deeplink: deeplink },
    position: 'top',
    visibilityTime: 4000,
  });
};

// fcm 인앱 알림 토스트 메세지
export const fcmToastMessage = (message: string, deeplink: string): void => {
  return Toast.show({
    type: 'fcmToast',
    props: { message: message, deeplink: deeplink },
    position: 'top',
    visibilityTime: 4000,
  });
};

// 알림용 상단 토스트 메세지
export const InfoTopToastMessage = (content: string): void => {
  return Toast.show({
    type: 'infoToast',
    props: { content: content },
    position: 'bottom',
    bottomOffset: 110,
    visibilityTime: 2000,
  });
};

// 알림용 토스트 메세지
export const InfoToastMessage = (content: string): void => {
  return Toast.show({
    type: 'infoToast',
    props: { content: content },
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};

// 로그인 에러 토스트 메세지
export const LoginErrorToastMessage = (message: string): void => {
  return Toast.show({
    type: 'errorToast',
    props: { message: message },
    position: 'bottom',
    bottomOffset: 180,
    visibilityTime: 2000,
  });
};

// 바텀 에러 토스트 메세지
export const BottomErrorToastMessage = (message: string): void => {
  return Toast.show({
    type: 'errorToast',
    props: { message: message },
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};

// 에러 토스트 메세지
export const ErrorToastMessage = (message: string): void => {
  return Toast.show({
    type: 'errorToast',
    props: { message: message },
    position: 'bottom',
    bottomOffset: 110,
    visibilityTime: 2000,
  });
};

// 채팅 시작 토스트 메세지
export const StartChatToastMessage = (): void => {
  return Toast.show({
    type: 'startChatToast',
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};

// 계좌등록 토스트 메세지
export const RegisterAccountToastMessage = (): void => {
  return Toast.show({
    type: 'registerAccountToast',
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};

// 계좌등록완료 토스트 메세지
export const CompleteRegisterAccountToastMessage = (): void => {
  return Toast.show({
    type: 'completeRegisterAccountToast',
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};

// 매칭완료 토스트 메세지
export const CompleteMatchToastMessage = (): void => {
  return Toast.show({
    type: 'completeMatchToast',
    position: 'bottom',
    bottomOffset: 30,
    visibilityTime: 2000,
  });
};
