import { atom } from 'recoil';

import { IsChatInRecoil } from '@recoil/types/chat';

// 채팅방 입장 여부 관리
export const isChatInRecoilState = atom<IsChatInRecoil>({
  key: 'isChatInRecoilState',
  default: false,
});
