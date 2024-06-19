// [원형 영역 내 방 조회] /api/rooms/map
export interface GetRoomCurrentCameraResponse {
  rooms: {
    id: number;
    departureLongitude: number;
    departureLatitude: number;
    spotName: string;
  }[];
}

// [경로를 제외한 방 리스트 조회] /api/rooms/list
export interface GetRoomListResponse {
  roomId: number;
  spotId: number;
  arrivalTime: string;
  arrivalName: string;
  roomTagBitMaskList: string[];
  departureTime: string;
  departureName: string;
  currentHeadcount: number;
  wishHeadcount: number;
  durationMinutes: number;
  expectedChargePerPerson: number;
  expectedCharge: number;
}

// [지도, 리스트 통합 조회] /api/rooms/integration
export interface GetRoomIntegrationResponse {
  roomId: number;
  spotId: number;
  arrivalTime: string;
  arrivalName: string;
  roomTagBitMaskList: string[];
  departureTime: string;
  departureName: string;
  departureLongitude: number;
  departureLatitude: number;
  currentHeadcount: number;
  wishHeadcount: number;
  durationMinutes: number;
  expectedChargePerPerson: number;
  expectedCharge: number;
}

// [모집 방 생성] /api/rooms
export interface CreateRoomResponse {
  managerId: number; // 방장 Id
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

  myRoom: boolean; // 내가 방장인지 여부
  participate: boolean; // 참여여부

  roomTagBitMaskList: string[]; // 카테고리

  path: {
    // 경로
    coordinateReferenceSystem: {
      type: string;
    };
    coordinates: { values: number[] }[];
    type: string;
  };
}

// [방 미리보기 조회] /api/rooms/preview/{id}
export interface GetRoomPreviewResponse {
  roomId: number;
  departureTime: string;
  departureName: string;
  arrivalName: string;
  roomStatus: string;
  currentHeadcount: number;
  wishHeadcount: number;
  expectedChargePerPerson: number;
  expectedCharge: number;
}

// [경로를 포함한 방 상세 정보 조회] /api/rooms/{id}
export interface GetRoomDetailResponse {
  managerId: number; // 방장 Id
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

  myRoom: boolean; // 내가 방장인지 여부
  participate: boolean; // 참여여부

  roomTagBitMaskList: string[]; // 카테고리

  minLongitude: number; // 카메라 조정 꼭짓점 좌표
  minLatitude: number;
  maxLongitude: number;
  maxLatitude: number;

  path: {
    coordinateReferenceSystem: {
      type: string;
    };
    coordinates: { values: number[] }[];
    type: string;
  };
}

// [모집방 수정] /api/rooms/{id}
export interface PatchRoomResponse {
  managerId: number; // 방장 Id
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

  myRoom: boolean; // 내가 방장인지 여부
  participate: boolean; // 참여여부

  roomTagBitMaskList: string[]; // 카테고리

  path: {
    coordinateReferenceSystem: {
      type: string;
    };
    coordinates: { values: number[] }[];
    type: string;
  };
}

// [모집 방 삭제] /api/rooms/{id}
export interface DeleteRoomResponse {
  isDeleted: boolean;
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
    nickname: string;
    imageUrl: string;
    thisIsMe: boolean;
  }[];
}

// [대기열 리스트 조회] /api/rooms/{roomId}/members/waiting
export interface GetRoomWaitingMembersResponse {
  waitingList: {
    memberId: number;
    nickname: string;
    imageUrl: string;
    thisIsMe: boolean;
  }[];
}

// [매칭 완료] /api/rooms/finish/matching/{id}
export interface CompleteMatchingResponse {
  isUpdated: boolean;
}

// [현재 내가 참여하고 있는 방 퇴장] /api/rooms
export interface ExitParticipateRoomResponse {
  isDeleted: boolean;
}

// [대기열에서 퇴장] /api/rooms/{roomId}/waiting
export interface ExitWaitingRoomResponse {
  isDeleted: boolean;
}
