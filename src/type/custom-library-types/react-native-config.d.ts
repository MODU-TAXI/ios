declare module 'react-native-config' {
  export interface NativeConfig {
    ENV: string;
    SERVER_URL: string;
    SENTRY_DSN: string;
    SOCKET_URL: string;
    X_NAVER_CLIENT_ID: string;
    X_NAVER_CLIENT_SECRET: string;
    X_NCP_APIGW_API_KEY_ID: string;
    X_NCP_APIGW_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
