import { atom } from 'recoil';

import { Arrival, UserInfo, Departure, Calculate, SignUpUser, MessageBody, SearchParam } from '@recoil/type';

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

// 방 생성 시 출발지
export const departureState = atom<Departure>({
  key: 'departure',
  default: {
    name: '',
    latitude: 0,
    longitude: 0,
  },
});

// 방 생성 시 도착거점
export const arrivalState = atom<Arrival>({
  key: 'arrivalName',
  default: {
    name: '',
    spotId: 0,
  },
});

export const searchKeywordState = atom<string>({
  key: 'searchKeyword',
  default: '',
});

export const searchParamState = atom<SearchParam>({
  key: 'searchParam',
  default: {
    title: '',
    longitude: 37.451062,
    latitude: 126.656496,
  },
})

// 정산 관련
export const calculateState = atom<Calculate>({
  key: 'calculate',
  default: {
    amount: '',
    account: '',
    bank: '',
    users: [],
  },
});
