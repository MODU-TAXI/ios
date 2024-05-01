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

export const chatInState = atom<boolean>({
  key: 'isChatIn',
  default: false,
});

export const chatState = atom<MessageBody[]>({
  key: 'chat',
  default: [],
});

export const memberIdState = atom<number>({
  key: 'memberId',
  default: -1,
});
