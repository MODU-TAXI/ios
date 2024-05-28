// 방 간단 정보
export interface RoomPreview {
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

// 방 세부 정보
export interface RoomDetail {
  managerId: number; // 방장 Id
  roomId: number; // 방 Id
  spotId: number; // 거점 Id
  departureDairyDate: string; // 날짜

  arrivalLongitude: number; // 도착 위도
  arrivalLatitude: number; // 도착 경도
  arrivalTime: string; // 도착 시각
  arrivalName: string; // 도착 위치

  departureLongitude: number; // 출발 위도
  departureLatitude: number; // 출발 경도
  departureTime: string; // 출발 시각
  departureName: string; // 출발 위치

  currentHeadcount: number; // 현재 인원
  wishHeadcount: number; // 목표 인원
  durationMinutes: number; // 예상 시간
  expectedChargePerPerson: number; // 사람별 예상 요금
  expectedCharge: number; // 예상 요금

  roomCategories: string[];
  myRoom: boolean; // 내가 방장인지 여부
  participate: boolean; // 참여여부

  path: {
    coordinateReferenceSystem: {
      type: string;
    };
    coordinates: { latitude: number; longitude: number }[];
    type: string;
  };
}

// 방 카테고리 정보
export interface RoomCategory {
  label: string;
  textColor: string;
  bgColor: string;
}

// 원형 영역 방 리스트
export interface RoomCurrentCamera {
  rooms: {
    id: number;
    departureLongitude: number;
    departureLatitude: number;
    spotName: string;
  }[];
}

// 방 정보
export interface RoomList {
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

// 방 참여자 정보
export interface RoomMember {
  memberId: number;
  nickname: string;
  imageUrl: string;
  thisIsMe: boolean;
}

// 방 대기자 정보
export interface RoomWaitingMember {
  memberId: number;
  nickname: string;
  imageUrl: string;
  thisIsMe: boolean;
}
