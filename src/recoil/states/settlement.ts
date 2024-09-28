import { atom } from 'recoil';

import { SettlementRecoil } from '@recoil/types/settlement';

// 정산 관련
export const settlementRecoilState = atom<SettlementRecoil>({
  key: 'settlementRecoilState',
  default: {
    name: '',
    amount: '',
    account: '',
    accountId: 0,
    bank: {
      identifier: '',
      name: '',
    },
    users: [],
  },
});
