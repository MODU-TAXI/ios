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

import { deleteToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

import { RootStackParamList } from '@type/ParamLists';

// 로그인 여부 확인
export const useCheckLogin = async () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      await deleteToken();
    }

    const response = await axios.patch(
      `${Config.SERVER_URL}api/members/refresh`,
      {},
      { headers: { refreshToken: refreshToken } },
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

    setLoggedIn(true);

    await setAccessToken(newAccessToken);
    await setRefreshToken(newRefreshToken);
  } catch (error) {
    setLoggedIn(false);
    await deleteToken();
  }
};

// 카카오 로그인
export const useKakaoLogin = (): UseMutationResult<KakaoOAuthToken, Error, void, unknown> => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [signUpUser, setSignUpUser] = useRecoilState<SignUpUser>(signUpUserState);

  return useMutation({
    mutationFn: () => login(),
    onSuccess: async (response: KakaoLoginResponse) => {
      const { accessToken } = response;

      const { existent, key } = await checkMembership('KAKAO', {
        accessToken: accessToken,
      });

      if (existent) {
        const response = await socialLogin('KAKAO', {
          accessToken: accessToken,
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
