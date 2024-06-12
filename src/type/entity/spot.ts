export interface Spot {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface SpotMap {
  distance: number;
  spots: {
    id: number;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
  }[]
}