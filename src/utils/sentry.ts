import * as Sentry from '@sentry/react-native'; // 줄여쓰면 에러발생 줄이지 말것

// sentry에 에러 메세지 보내기
const sendMessageToSentry = (error: any) => {
  Sentry.captureMessage(error);
};

export default sendMessageToSentry;
