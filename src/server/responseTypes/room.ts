// [원형 영역 내 방 조회] /api/rooms/map
export interface CheckRoomResponse {
  id: number;
  departureLongitude: number;
  departureLatitude: number;
  spotName: string;
}

// [모집 방 생성] /api/rooms
export interface CreateRoomResponse {
  roomId: number; // 방 Id
  spotId: number; // 거점 Id
  departureDairyDate: string; // 날짜

  arrivalLongitude: number; // 출발 위도
  arrivalLatitude: number; // 출발 경도
  arrivalTime: string; // 출발 시각
  arrivalName: string; // 출발 위치

  departureLongitude: number; // 도착 위도
  departureLatitude: number; // 도착경도
  departureTime: string; // 도착 시각
  departureName: string; // 도착 위치

  currentHeadcount: number; // 현재 인원
  wishHeadcount: number; // 목표 인원
  durationMinutes: number; // 예상 시간
  expectedChargePerPerson: number; // 사람별 예상 요금
  expectedCharge: number; // 예상 요금

  // managerId: number;
  // managerName: string;
  roomTagBitMaskList: string[]; // 카테고리
  path: {
    coordinateReferenceSystem: {
      type: string;
    };
    coordinates: { values: number[] }[];
    type: string;
  };
}

// [경로를 포함한 방 상세 정보 조회] /api/rooms/{id}
export interface GetRoomDetailResponse {
  roomId: number; // 방 Id
  spotId: number; // 거점 Id
  departureDairyDate: string; // 날짜

  arrivalLongitude: number; // 출발 위도
  arrivalLatitude: number; // 출발 경도
  arrivalTime: string; // 출발 시각
  arrivalName: string; // 출발 위치

  departureLongitude: number; // 도착 위도
  departureLatitude: number; // 도착경도
  departureTime: string; // 도착 시각
  departureName: string; // 도착 위치

  currentHeadcount: number; // 현재 인원
  wishHeadcount: number; // 목표 인원
  durationMinutes: number; // 예상 시간
  expectedChargePerPerson: number; // 사람별 예상 요금
  expectedCharge: number; // 예상 요금

  // managerId: number;
  // managerName: string;
  roomTagBitMaskList: string[]; // 카테고리
  path: {
    coordinateReferenceSystem: {
      type: string;
    };
    coordinates: { values: number[] }[];
    type: string;
  };
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
