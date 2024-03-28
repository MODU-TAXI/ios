import { atom } from 'recoil';

export const tempUserState = atom<{
  name: string;
  gender: string;
  phoneNumber: string;
}>({
  key: 'tempUser',
  default: {
    name: '',
    gender: '',
    phoneNumber: '',
  },
});
