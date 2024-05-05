export interface CreateRoomRequest {
  spotId: number;
  roomTagBitMask: string[];
  departureLongitude: number;
  departureLatitude: number;
  departureTime: Date;
  departureName: string;
  wishHeadcount: number;
}
