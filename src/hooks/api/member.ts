import { useRecoilState } from 'recoil';
import Toast from 'react-native-toast-message';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, KakaoOAuthToken } from '@react-native-seoul/kakao-login';

import { SignUpUser } from '@recoil/type';
import { loggedInState, userInfoState, signUpUserState } from '@recoil/recoil';

import { memberErrorHandler } from '@server/errorHandler/member';
import { RegisterNicknameRequest } from '@server/requestTypes/member';
import { socialLogin, checkMembership, registerNickname } from '@server/api/member';
import { KakaoLoginResponse, RegisterNicknameResponse } from '@server/responseTypes/member';

import { useFcmToken } from '@hooks/fcm';

import { setAccessToken, setRefreshToken } from '@utils/token';

// 카카오 로그인
export const useKakaoLogin = (
  navigation: any,
): UseMutationResult<KakaoOAuthToken, Error, void, unknown> => {
  const [fcmToken] = useFcmToken();
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [, setLoggedIn] = useRecoilState(loggedInState);
  const [, setSignUpUser] = useRecoilState<SignUpUser>(signUpUserState);

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoLoginResponse) => {
      const { accessToken: kakaoAccessToken } = response;

      const { existent, key } = await checkMembership('KAKAO', {
        accessToken: kakaoAccessToken,
        fcmToken: fcmToken,
      });

      if (existent) {
        const response = await socialLogin('KAKAO', {
          accessToken: kakaoAccessToken,
          fcmToken: fcmToken,
        });

        const { accessToken, refreshToken } = response.tokenResponse;

        // 토큰 저장
        await setAccessToken(accessToken);

        await setRefreshToken(refreshToken);

        // 유저 정보 저장
        setUserInfo(response.memberInfoResponse);

        // 로그인 여부 수정
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

// 닉네임 설정
export const useRegisterNickname = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<RegisterNicknameResponse, void, RegisterNicknameRequest> => {
  return useMutation({
    mutationFn: (registerNicknameRequest: RegisterNicknameRequest) =>
      registerNickname(registerNicknameRequest),

    onError: (error: any) => {
      memberErrorHandler(error, setErrorMessage);
    },
  });
};
