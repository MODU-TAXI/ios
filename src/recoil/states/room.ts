import { atom } from 'recoil';

import { CurrentRoomRecoil } from '@recoil/types/room';

// 참여하고 있는 방정보 관리
export const currentRoomRecoilState = atom<CurrentRoomRecoil>({
  key: 'currentRoomRecoilState',
  default: 0,
});
