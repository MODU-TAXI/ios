import Toast from 'react-native-toast-message';

// 알림용 토스트 메세지
export const InfoToastMessage = (content: string): void => {
  return Toast.show({
    type: 'infoToast',
    props: { content: content },
    position: 'top',
    bottomOffset: 30,
  });
};

// 에러 토스트 메세지
export const ErrorToastMessage = (message: string): void => {
  return Toast.show({
    type: 'errorToast',
    props: { message: message },
    position: 'top',
    bottomOffset: 30,
  });
};

// 채팅 시작 토스트 메세지
export const StartChatToastMessage = (): void => {
  return Toast.show({
    type: 'startChatToast',
    position: 'top',
    bottomOffset: 30,
  });
};

// 계좌등록 토스트 메세지
export const RegisterAccountToastMessage = (): void => {
  return Toast.show({
    type: 'registerAccountToast',
    position: 'top',
    bottomOffset: 30,
  });
};

// 계좌등록완료 토스트 메세지
export const CompleteRegisterAccountToastMessage = (): void => {
  return Toast.show({
    type: 'completeRegisterAccountToast',
    position: 'top',
    bottomOffset: 30,
  });
};

// 매칭완료 토스트 메세지
export const CompleteMatchToastMessage = (): void => {
  return Toast.show({
    type: 'completeMatchToast',
    position: 'top',
    bottomOffset: 30,
  });
};
