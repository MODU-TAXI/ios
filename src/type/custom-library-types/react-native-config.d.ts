declare module 'react-native-config' {
  export interface NativeConfig {
    ENV: string;
    SERVER_URL: string;
    SENTRY_DSN: string;
    SOCKET_URL: string;
    X_NAVER_CLIENT_ID: string;
    X_NAVER_CLIENT_SECRET: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
