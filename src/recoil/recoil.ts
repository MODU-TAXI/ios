import { atom } from 'recoil';
import { SignUpUser } from '@recoil/type';

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

// 12321   42531
