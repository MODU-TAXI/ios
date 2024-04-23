import * as Sentry from '@sentry/react-native'; // 줄여쓰면 에러발생 줄이지 말것
import Config from 'react-native-config';

// sentry에 에러 메세지 보내기
const sendMessageToSentry = (error: any) => {
  // production 환경일때만 sentry에 에러 메세지 전송
  if (Config.ENV === 'PRODUCT') {
    Sentry.captureMessage(error);
  }
};

export default sendMessageToSentry;
