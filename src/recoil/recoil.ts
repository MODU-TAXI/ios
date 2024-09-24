/*
[recoil 변수명 규칙]
1. recoil를 뒤에 붙힌다. (그냥 state와 헷갈리기 때문)
2. state를 뒤에 붙힌다
3. recoil의 type명에도 뒤에 recoil 명시한다. entity와 겹칠 수 있기 때문
4. key는 state명과 똑같이 사용한다.
5. 가져다 사용할때에도 항상 똑같이 fullname을 사용한다. 사용하는 곳 모두 변수 통일
   const [tempUserRecoil, setTempUserRecoil] = useRecoilState<TempUserRecoil>(tempUserRecoilState) 
6. 타입이 단일이여도 변수명을 꼭 붙혀주기 atom<boolean> 이렇게 하면 x
*/

import { atom } from 'recoil';

import {
  Arrival,
  UserInfo,
  Departure,
  Calculate,
  MessageBody,
  TempUserRecoil,
  IsChatInRecoil,
  TempEmailRecoil,
  IsLoggedInRecoil,
  SearchParamRecoil,
} from '@recoil/type';

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

// 채팅방 입장 여부 관리
export const isChatInRecoilState = atom<IsChatInRecoil>({
  key: 'isChatInRecoilState',
  default: false,
});

// 로그인한 유저 정보 관리
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
    matchingCount: 0,
    blocked: false,
  },
});

// 참여하고 있는 방정보 관리
export const roomState = atom<number>({
  key: 'socketRoomId',
  default: 0,
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

export const searchParamRecoilState = atom<SearchParamRecoil>({
  key: 'searchParamRecoilState',
  default: {
    title: '',
    longitude: 126.656496,
    latitude: 37.451062,
  },
});

// 정산 관련
export const calculateState = atom<Calculate>({
  key: 'calculate',
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
