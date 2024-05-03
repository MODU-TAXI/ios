import { atom } from 'recoil';
import { MessageBody, SignUpUser } from '@recoil/type';

export const signUpUserState = atom<SignUpUser>({
  key: 'tempUser',
  default: {
    key: '',
    name: '',
    gender: '',
    phoneNumber: '',
  },
});

export const loggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
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

// 채팅방 입장 여부 관리
export const chatInState = atom<boolean>({
  key: 'isChatIn',
  default: false,
});

//  채팅 메세지 관리
export const messagesState = atom<MessageBody[]>({
  key: 'messages',
  default: [],
});
