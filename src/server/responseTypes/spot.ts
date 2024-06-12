export interface CheckSpotResponse {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  distance: number;
  liked: boolean;
}

export interface GetSpotListResponse {
  spots: {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    distance: number;
    liked: boolean; 
  }[]
}

export interface GetSpotMapResponse {
  distance: number;
  spots: {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  }[]
};