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
