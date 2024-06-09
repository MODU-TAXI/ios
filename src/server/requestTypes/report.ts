// [신고하기] /api/reports
export interface PostReportRequest {
  roomId: number;
  targetId: number;
  type: string;
  content: string;
}
