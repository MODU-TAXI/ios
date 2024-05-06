// 방 세부 정보
export interface RoomDetail {
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

  roomCategories: string[];
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
