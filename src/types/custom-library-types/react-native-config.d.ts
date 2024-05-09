declare module 'react-native-config' {
  export interface NativeConfig {
    ENV: string;
    SERVER_URL: string;
    SENTRY_DSN: string;
    SOCKET_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
