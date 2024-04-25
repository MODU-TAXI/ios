export interface CreateMatchRequest {
  departurePoint: {
    x: number;
    y: number;
  };
  spotId: number;
  roomTagBitMask: string[];
  departureTime: Date;
  wishHeadcount: number;
}
