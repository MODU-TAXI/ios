import { useState, useEffect } from 'react';

import { getAccessToken } from '@utils/token';

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
