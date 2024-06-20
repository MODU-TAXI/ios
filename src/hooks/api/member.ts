import { useRecoilState } from 'recoil';
import Toast from 'react-native-toast-message';
import appleAuth from '@invertase/react-native-apple-authentication';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { login, KakaoOAuthToken } from '@react-native-seoul/kakao-login';

import { SignUpUser } from '@recoil/type';
import { loggedInState, userInfoState, signUpUserState } from '@recoil/recoil';

import { memberErrorHandler } from '@server/errorHandler/member';
import { PatchMemberRequest, RegisterNicknameRequest } from '@server/requestTypes/member';
import { socialLogin, patchMember, checkMembership, registerNickname } from '@server/api/member';
import {
  AppleLoginResponse,
  KakaoLoginResponse,
  PatchMemberResponse,
  RegisterNicknameResponse,
} from '@server/responseTypes/member';

import { useFcmToken } from '@hooks/fcm';

import { ErrorToastMessage } from '@utils/toastMessage';
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

// 애플 로그인
export const useAppleLogin = (
  navigation: any,
): UseMutationResult<AppleLoginResponse, Error, void, unknown> => {
  const [fcmToken] = useFcmToken();
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [, setLoggedIn] = useRecoilState(loggedInState);
  const [, setSignUpUser] = useRecoilState<SignUpUser>(signUpUserState);

  return useMutation({
    mutationFn: () => appleLoginAuth(),
    onSuccess: async (response: AppleLoginResponse) => {
      const { authorizationCode: appleAuthCode } = response;

      const { existent, key } = await checkMembership('APPLE', {
        accessToken: appleAuthCode,
        fcmToken: fcmToken,
      });

      // 재발급
      const newAppleLoginResponse = await appleLoginAuth();
      const { authorizationCode: newAppleAuthCode } = newAppleLoginResponse;

      if (existent) {
        const response = await socialLogin('APPLE', {
          accessToken: newAppleAuthCode,
          fcmToken: fcmToken,
        });
        const { accessToken, refreshToken } = response.tokenResponse;

        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);

        setUserInfo(response.memberInfoResponse);
        setLoggedIn(true);
      } else {
        if (key) {
          setSignUpUser((prevState: SignUpUser) => ({
            ...prevState,
            key: key,
          }));

          navigation.navigate('CheckPermissionScreen');
        } else {
          throw new Error('애플 로그인에 실패하였습니다');
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
    }
  });
};

// 애플 인가 요청 (사용자 FaceID 인증절차)
export const appleLoginAuth = async (): Promise<AppleLoginResponse> => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  if (credentialState === appleAuth.State.AUTHORIZED) {
    return appleAuthRequestResponse;
  } else {
    throw new Error('Apple Login Failed');
  }
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

// 멤버 프로필 변경
export const usePatchMember = (): UseMutationResult<
  PatchMemberResponse,
  void,
  PatchMemberRequest
> => {
  return useMutation({
    mutationFn: (patchMemberRequest: PatchMemberRequest) => patchMember(patchMemberRequest),
    onError: () => {
      ErrorToastMessage('프로필 변경에 실패하였습니다.');
    },
  });
};
