import { Bank } from '@type/entity/account';
import { UserPreview } from '@type/entity/user';

export type DepartureRecoil = {
  name: string;
  latitude: number;
  longitude: number;
};

export type ArrivalRecoil = {
  name: string;
  spotId: number;
};

export type SearchParamRecoil = {
  title: string;
  latitude: number;
  longitude: number;
};
