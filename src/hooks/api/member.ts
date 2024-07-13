import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import appleAuth from '@invertase/react-native-apple-authentication';
import { login, KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import { useMutation, useSuspenseQuery, UseMutationResult } from '@tanstack/react-query';

import { SignUpUser } from '@recoil/type';
import { loggedInState, userInfoState, signUpUserState } from '@recoil/recoil';

import { mutateErrorHandler } from '@server/errorHandler/mutateErrorHandler';
import { PatchMemberRequest, RegisterNicknameRequest } from '@server/requestTypes/member';
import { socialLogin, patchMember, deleteMember, getMemberInfo, registerNickname } from '@server/api/member';
import {
  SocialLoginError,
  AppleLoginResponse,
  KakaoLoginResponse,
  PatchMemberResponse,
  GetMemberInfoResponse,
  RegisterNicknameResponse,
} from '@server/responseTypes/member';

import { useFcmToken } from '@hooks/fcm';

import { setAccessToken, setRefreshToken } from '@utils/token';

import { MemberInfo } from '@type/entity/user';

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

      const socialResponse = await socialLogin('KAKAO', {
        accessToken: kakaoAccessToken,
        fcmToken: fcmToken,
      });

      // 기존 유저인지의 여부
      const existent: boolean = socialResponse.status === 200;

      // 기존 유저
      if (existent) {
        const { accessToken, refreshToken } = socialResponse.data.tokenResponse;

        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);

        setUserInfo(socialResponse.data.memberInfoResponse);
        setLoggedIn(true);
      }
    },
    onError: (error: AxiosError<SocialLoginError>) => {
      if (error.response?.data?.code === 'MEMBER_004') {
        const key = error.response?.data?.message;
        setSignUpUser((prevState) => ({
          ...prevState,
          key: key,
        }));
      
        navigation.navigate('CheckPermissionScreen');
      } else {
        mutateErrorHandler(error, setLoggedIn);
      }
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

      const socialResponse = await socialLogin('APPLE', {
        accessToken: appleAuthCode,
        fcmToken: fcmToken,
      });

      // 기존 유저인지의 여부
      const existent: boolean = socialResponse.status === 200;

      // 기존 유저
      if (existent) {
        const { accessToken, refreshToken } = socialResponse.data.tokenResponse;

        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);

        setUserInfo(socialResponse.data.memberInfoResponse);
        setLoggedIn(true);
      }
    },
    onError: (error: AxiosError<SocialLoginError>) => {
      if (error.response?.data?.code === 'MEMBER_004') {
        const key = error.response?.data?.message;
        setSignUpUser((prevState) => ({
          ...prevState,
          key: key,
        }));
      
        navigation.navigate('CheckPermissionScreen');
      } else {
        mutateErrorHandler(error, setLoggedIn);
      }
    },
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
    throw new Error('Apple 인증에 실패하였습니다');
  }
};

// 닉네임 설정
export const useRegisterNickname = (
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
): UseMutationResult<RegisterNicknameResponse, void, RegisterNicknameRequest> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (registerNicknameRequest: RegisterNicknameRequest) =>
      registerNickname(registerNicknameRequest),

    onError: (error: any) => {
      mutateErrorHandler(error, setLoggedIn, setErrorMessage);
    },
  });
};

// 멤버 프로필 변경
export const usePatchMember = (): UseMutationResult<
  PatchMemberResponse,
  void,
  PatchMemberRequest
> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: (patchMemberRequest: PatchMemberRequest) => patchMember(patchMemberRequest),
    onError: (error) => {
      mutateErrorHandler(error, setLoggedIn);
    },
  });
};

// 회원 탈퇴
export const useDeleteMember = (): UseMutationResult<void, void, void> => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  return useMutation({
    mutationFn: deleteMember,
    onError: (error) => {
      mutateErrorHandler(error, setLoggedIn);
    },
    onSuccess: () => {
      // TODO: 카카오 연결 끊기
    },
  });
};

export const useGetMemberInfo = (
  userId: number,
): { data: MemberInfo; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['memberInfo', userId],
    queryFn: () => getMemberInfo(userId),
    select: (response: GetMemberInfoResponse) => {
      return response;
    }
  });
  
  return { data, refetch };
}