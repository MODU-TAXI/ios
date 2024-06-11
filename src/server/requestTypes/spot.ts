export interface CheckSpotRequest {
  id: number;
  longitude: number;
  latitude: number;
}

export interface GetSpotMapRequest {
  count: number;
  searchLongitude: number;
  searchLatitude: number;
}