// [원형 영역 내 방 조회] /api/rooms/map
export interface CheckRoomResponse {
  id: number;
  departureLongitude: number;
  departureLatitude: number;
  spotName: string;
}

// [경로를 포함한 방 상세 정보 조회] /api/rooms/{id}
export interface CheckRoomDetailResponse {
  roomId: number;
  spotId: number;
  roomTagBitMaskList: string[];
  departureLongitude: number;
  departureLatitude: number;
  departureTime: Date;
  wishHeadcount: number;
  duration: number;
  expectedCharge: number;
  path: Path;
}

interface Path {
  coordinateReferenceSystem: {
    type: string;
  };
  coordinates: Coordinate[];
  type: string;
}

interface Coordinate {
  values: number[];
}
