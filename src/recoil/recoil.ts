import { atom } from 'recoil';

import {
  MessageBody,
  ArrivalRecoil,
  IsChatInRecoil,
  DepartureRecoil,
  SettlementRecoil,
  SearchParamRecoil,
  CurrentRoomRecoil,
} from '@recoil/type';

// 채팅방 입장 여부 관리
export const isChatInRecoilState = atom<IsChatInRecoil>({
  key: 'isChatInRecoilState',
  default: false,
});

// 참여하고 있는 방정보 관리
export const currentRoomRecoilState = atom<CurrentRoomRecoil>({
  key: 'currentRoomRecoilState',
  default: 0,
});

// 채팅 메세지 관리
export const messagesState = atom<MessageBody[]>({
  key: 'messages',
  default: [],
});

// 방 생성 시 출발지
export const departureRecoilState = atom<DepartureRecoil>({
  key: 'departureRecoilState',
  default: {
    name: '',
    latitude: 0,
    longitude: 0,
  },
});

// 방 생성 시 도착거점
export const arrivalRecoilState = atom<ArrivalRecoil>({
  key: 'arrivalRecoilState',
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
