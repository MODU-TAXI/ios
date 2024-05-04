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

// [방 입장 요청] /api/rooms/{roomId}/apply
export interface JoinRoomResponse {
  isApplied: boolean;
}

// [특정 사용자 입장 수락] /api/rooms/{roomId}/memberId/{memberId}/approve
export interface ApproveJoinRoomResponse {
  isApplied: boolean;
}

// [특정 방 참가 리스트 조회] /api/rooms/{roomId}/members/in
export interface GetRoomMembersResponse {
  inList: {
    memberId: number;
    name: string;
    score: number;
  }[];
}

// [대기열 리스트 조회] /api/rooms/{roomId}/members/waiting
export interface GetRoomWaitingMembersResponse {
  waitingList: {
    memberId: number;
    name: string;
    score: number;
  }[];
}
