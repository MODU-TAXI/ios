import { useEffect } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

import { UserRecoil } from '@recoil/type';
import { userRecoilState } from '@recoil/recoil';

import { refreshAccessToken } from '@server/api/member';

import { deleteToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

export const useCheckLogin = (
  setLoggedIn: SetterOrUpdater<boolean>,
  setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setUserRecoil = useSetRecoilState<UserRecoil>(userRecoilState);

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
        setUserRecoil(memberInfoResponse);

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
  }, [setLoggedIn, setUserRecoil, setAppLoaded]);
};
