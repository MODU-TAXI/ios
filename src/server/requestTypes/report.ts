// [신고하기] /api/reports
export interface PostReportRequest {
  targetId: number;
  type: string;
  content: string;
}
