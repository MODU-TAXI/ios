import axios from 'axios';
import { useRecoilState } from 'recoil';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { SignUpUser } from '@recoil/type';
import { loggedInState, signUpUserState } from '@recoil/recoil';

import { socialLogin, checkMembership } from '@server/api/member';
import { KakaoLoginResponse } from '@server/responseTypes/member';

import { useFcmToken } from '@hooks/fcm';

import { setAccessToken, setRefreshToken } from '@utils/token';

// 카카오 로그인
export const useKakaoLogin = (
  navigation: any,
): UseMutationResult<KakaoOAuthToken, Error, void, unknown> => {
  const [fcmToken] = useFcmToken();
  const [, setLoggedIn] = useRecoilState(loggedInState);
  const [, setSignUpUser] = useRecoilState<SignUpUser>(signUpUserState);

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoLoginResponse) => {
      const { accessToken } = response;

      const { existent, key } = await checkMembership('KAKAO', {
        accessToken: accessToken,
        fcmToken: fcmToken,
      });

      if (existent) {
        const response = await socialLogin('KAKAO', {
          accessToken: accessToken,
          fcmToken: fcmToken,
        });

        await setAccessToken(response.accessToken);

        await setRefreshToken(response.refreshToken);

        setLoggedIn(true);
      } else {
        if (key) {
          setSignUpUser((prevState: SignUpUser) => ({
            ...prevState,
            key: key,
          }));

          navigation.navigate('CheckPermissionScreen');
        } else {
          throw new Error('카카오 로그인에 실패하였습니다');
        }
      }
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: '로그인 실패',
        text2: '로그인 재시도 하세요',
        position: 'bottom',
      });
    },
  });
};
