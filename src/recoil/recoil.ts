import { atom } from 'recoil';

import { ArrivalRecoil, DepartureRecoil, SearchParamRecoil } from '@recoil/type';

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
