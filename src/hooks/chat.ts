import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { IsChatInRecoil } from '@recoil/types/chat';
import { isChatInRecoilState } from '@recoil/states/chat';

// 채팅방 입장, 퇴장 여부 확인 (채팅방 안에서는 알림 수신 방지용)
export const useEnterChatRoom = (): void => {
  const [, setIsChatInRecoil] = useRecoilState<IsChatInRecoil>(isChatInRecoilState);

  useEffect(() => {
    setIsChatInRecoil(true);

    return () => setIsChatInRecoil(false);
  }, [setIsChatInRecoil]);
};
