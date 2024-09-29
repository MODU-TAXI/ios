import { atom } from "recoil";

import { SearchParamRecoil } from "@recoil/types/search";

export const searchParamRecoilState = atom<SearchParamRecoil>({
  key: 'searchParamRecoilState',
  default: {
    title: '',
    longitude: 126.656496,
    latitude: 37.451062,
  },
});