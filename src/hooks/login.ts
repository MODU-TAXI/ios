import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Config from 'react-native-config';

import { chatInState, loggedInState } from '@recoil/recoil';

import { deleteToken, setAccessToken, getRefreshToken, setRefreshToken } from '@utils/token';

export const useCheckLogin = async () => {
  const [, setLoggedIn] = useRecoilState(chatInState);

  useEffect(() => {
    async () => {
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          setLoggedIn(false);
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
  }, [setLoggedIn]);
};
