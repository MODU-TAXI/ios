import { atom } from 'recoil';
import { SignUpRequest } from '@type/request.types';

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
