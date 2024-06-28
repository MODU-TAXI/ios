import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useRecoilState, SetterOrUpdater } from 'recoil';

import { userInfoState } from '@recoil/recoil';

import { refreshAccessToken } from '@server/api/member';

import { deleteToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

export const useCheckLogin = (
  setLoggedIn: SetterOrUpdater<boolean>,
  setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [, setUserInfo] = useRecoilState(userInfoState);

  const start = Date.now();

  useEffect(() => {
    (async () => {
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          setLoggedIn(false);
          await deleteToken();
          const elapsed = Date.now() - start;
          const remainingTime = 3500 - elapsed;
          if (remainingTime > 0) {
            setTimeout(() => setAppLoaded(true), remainingTime);
          } else {
            setAppLoaded(true);
          }
          return;
        }

        const { tokenResponse, memberInfoResponse } = await refreshAccessToken(refreshToken);

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenResponse;

        // 유저 정보 저장
        setUserInfo(memberInfoResponse);

        // 토큰 저장
        await Promise.all([setAccessToken(newAccessToken), setRefreshToken(newRefreshToken)]);

        setLoggedIn(true);

        const elapsed = Date.now() - start;
        const remainingTime = 3500 - elapsed;
        if (remainingTime > 0) {
          setTimeout(() => setAppLoaded(true), remainingTime);
        } else {
          setAppLoaded(true);
        }
      } catch (error) {
        setLoggedIn(false);
        await deleteToken();
        const elapsed = Date.now() - start;
        const remainingTime = 3500 - elapsed;
        if (remainingTime > 0) {
          setTimeout(() => setAppLoaded(true), remainingTime);
        } else {
          setAppLoaded(true);
        }
      }
    })();
  }, [setLoggedIn, setUserInfo, setAppLoaded]);
};
