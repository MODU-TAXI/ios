import { getAccessToken } from '@utils/token';
import { useEffect, useState } from 'react';

// accessToken 가져오기
export const useAccessToken = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      const tempAccessToken = await getAccessToken();

      if (tempAccessToken) {
        setAccessToken(tempAccessToken);
      }
    })();
  }, []);

  return [accessToken, setAccessToken];
};
