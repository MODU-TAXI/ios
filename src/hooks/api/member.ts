import { useRecoilState } from 'recoil';
import { login } from '@react-native-seoul/kakao-login';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';

import {
  checkMembershipApi,
  emailAuthentication,
  socialLogin,
} from '@server/api/member';
import { SignUpUser } from '@recoil/type';
import { loggedInState, signUpUserState } from '@recoil/recoil';
import { RootStackParamList } from '@type/ParamLists';
import { setAccessToken, setRefreshToken } from '@utils/token';

type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};

// 카카오 로그인
export const useKakaoLogin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [signUpUser, setSignUpUser] =
    useRecoilState<SignUpUser>(signUpUserState);

  return useMutation({
    mutationFn: () => login(),
    throwOnError: true,
    onSuccess: async (response: KakaoLoginResponse) => {
      const { accessToken } = response;

      const { existent, key } = await checkMembershipApi('KAKAO', {
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
  });
};
