// [모집방 생성] /api/rooms
export interface CreateRoomRequest {
  spotId: number;
  roomTagBitMask: string[];
  departureLongitude: number;
  departureLatitude: number;
  departureTime: Date;
  departureName: string;
  wishHeadcount: number;
}

// [모집방 수정] /api/rooms/{id}
export interface PatchRoomRequest {
  spotId: number;
  roomTagBitMask: string[];
  departureLongitude: number;
  departureLatitude: number;
  departureTime: Date;
  departureName: string;
  wishHeadcount: number;
}

// [원형 영역 내 방 조회] /api/rooms/map
export interface GetRoomCurrentCameraRequest {
  searchLongitude: number;
  searchLatitude: number;
  radius?: number;
  spotId?: number;
  roomTags?: string[];
  isImminent?: boolean;
}

// [경로를 제외한 방 리스트 조회] /api/rooms/list
export interface GetRoomListRequest {
  page: number;
  size: number;
  searchLongitude: number;
  searchLatitude: number;
  sortType: string;
  spotId?: number;
  radius?: number;
  roomTags?: string[];
  isImminent?: boolean;
}

// [지도, 리스트 통합 조회] /api/rooms/integration
export interface GetRoomIntegrationRequest {
  searchLongitude: number;
  searchLatitude: number;
  sortType: string;
  spotId?: number;
  radius?: number;
  roomTags?: string[];
  isImminent?: boolean;
}
