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

  /** [ ONLY_WOMAN, ONLY_MAN, MANNER, QUIET, STUDENT_CERTIFICATION ] */
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
    /** [ NAME, LINK ] */
    type: string;
  };
  coordinates: Coordinate[];

  /** [ GEOMETRY_COLLECTION, LINE_STRING, MULTI_LINE_STRING, MULTI_POINT, MULTI_POLYGON, POINT, POLYGON ] */
  type: string;
}

/** [longitude, latitude] */
interface Coordinate {
  values: number[];
}
