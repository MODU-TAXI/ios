export interface Spot {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface SpotMap {
  minLongitude: number;
  minLatitude: number;
  maxLongitude: number;
  maxLatitude: number;
  spots: {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  }[]
}