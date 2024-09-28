import { atom } from 'recoil';

import { UserRecoil, TempUserRecoil, TempEmailRecoil, IsLoggedInRecoil } from '@recoil/types/user';

// 회원가입 중인 유저 정보 관리
export const tempUserRecoilState = atom<TempUserRecoil>({
  key: 'tempUserRecoilState',
  default: {
    key: '',
    name: '',
    gender: '',
    phoneNumber: '',
  },
});

// 로그인한 유저 정보 관리
export const userRecoilState = atom<UserRecoil>({
  key: 'userInfo',
  default: {
    id: 0,
    name: '',
    nickname: '',
    gender: '',
    phoneNumber: '',
    email: '',
    imageUrl: '',
    matchingCount: 0,
    blocked: false,
  },
});

// 회원가입 중 이메일 정보 관리
export const tempEmailRecoilState = atom<TempEmailRecoil>({
  key: 'tempEmailRecoilState',
  default: '',
});

// 로그인 여부 관리
export const isLoggedInRecoilState = atom<IsLoggedInRecoil>({
  key: 'isLoggedInRecoilState',
  default: false,
});
