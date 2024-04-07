import AsyncStorage from '@react-native-async-storage/async-storage';

// accessToken 저장
export const setAccessToken = async (accessToken: string): Promise<void> => {
  AsyncStorage.setItem('accessToken', accessToken);
};

// accessToken 가져오기
export const getAccessToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem('accessToken');
};

// refreshToken 저장
export const setRefreshToken = async (refreshToken: string): Promise<void> => {
  AsyncStorage.setItem('refreshToken', refreshToken);
};

// refreshToken 가져오기
export const getRefreshToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem('refreshToken');
};
