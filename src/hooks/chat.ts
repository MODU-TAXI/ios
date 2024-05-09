import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { chatInState } from '@recoil/recoil';

// 채팅방 입장, 퇴장 여부 확인 (채팅방 안에서는 알림 수신 방지용)
export const useEnterChatRoom = (): void => {
  const [, setChatIn] = useRecoilState(chatInState);

  useEffect(() => {
    setChatIn(true);

    return () => setChatIn(false);
  }, []);
};
