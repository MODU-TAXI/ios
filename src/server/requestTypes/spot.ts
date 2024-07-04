export interface CheckSpotRequest {
  id: number;
  longitude: number;
  latitude: number;
}

export interface GetSpotListRequest {
  page: number;
  size: number;
  currentLongitude?: number;
  currentLatitude?: number;
  searchLongitude: number;
  searchLatitude: number;
}

export interface GetSpotMapRequest {
  count: number;
  searchLongitude: number;
  searchLatitude: number;
}