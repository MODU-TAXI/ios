import { atom } from 'recoil';

import { UserInfo, SignUpUser, MessageBody } from '@recoil/type';

export const signUpUserState = atom<SignUpUser>({
  key: 'tempUser',
  default: {
    key: '',
    name: '',
    gender: '',
    phoneNumber: '',
  },
});

// 로그인 여부 관리
export const loggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

// 유저 정보 관리
export const userInfoState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    id: 0,
    name: '',
    nickname: '',
    gender: '',
    phoneNumber: '',
    email: '',
    imageUrl: '',
  },
});

export const emailState = atom<string>({
  key: 'email',
  default: '',
});

// 유저 정보 관리
export const memberIdState = atom<number>({
  key: 'memberId',
  default: -1,
});

// 참여하고 있는 방정보 관리
export const roomState = atom<number>({
  key: 'socketRoomId',
  default: 0,
});

// 채팅방 입장 여부 관리
export const chatInState = atom<boolean>({
  key: 'isChatIn',
  default: false,
});

// 채팅 메세지 관리
export const messagesState = atom<MessageBody[]>({
  key: 'messages',
  default: [],
});
