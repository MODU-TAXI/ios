import Toast from 'react-native-toast-message';

// 알림용 토스트 메세지
export const InfoToastMessage = (description: string): void => {
  return Toast.show({
    type: 'info',
    text1: '성공!',
    text2: description,
    position: 'bottom',
  });
};

// 에러용 토스트 메세지
export const ErrorToastMessage = (description: string): void => {
  return Toast.show({
    type: 'error',
    text1: '에러발생',
    text2: description,
    position: 'bottom',
  });
};
