import { useEffect } from 'react';
import { useRecoilState, SetterOrUpdater } from 'recoil';

import { userInfoState } from '@recoil/recoil';

import { refreshAccessToken } from '@server/api/member';

import { deleteToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

export const useCheckLogin = (setLoggedIn: SetterOrUpdater<boolean>) => {
  const [, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    (async () => {
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          setLoggedIn(false);
          await deleteToken();
          return;
        }

        const { tokenResponse, memberInfoResponse } = await refreshAccessToken(refreshToken);

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenResponse;

        // 유저 정보 저장
        setUserInfo(memberInfoResponse);

        // 토큰 저장
        await setAccessToken(newAccessToken);
        await setRefreshToken(newRefreshToken);

        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
        await deleteToken();
      }
    })();
  }, [setLoggedIn, setUserInfo]);
};
