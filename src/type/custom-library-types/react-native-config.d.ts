declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    SERVER_URL?: string;
    SETNRY_DSN?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
