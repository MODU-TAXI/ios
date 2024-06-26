import { History, HistoryPreview } from '@type/entity/history';

// [이용 내역 전체 조회] /api/histories
export interface HistoriesResponse {
  historySimpleListResponse: HistoryPreview[];
}

// [월/연별 이용 내역 상세 조회] /api/histories/monthly
export interface HistoriesMonthlyResponse {
  year: number;
  month: number;
  accumulateTotalCharge: number;
  accumulatePortionCharge: number;
  historySimpleListResponse: HistoryPreview[];
}

// [이용 내역 상세 조회] /api/histories/{id}
export type HistoryDetailResponse = History;

// [내가 생성했던 기록의 시작과 끝 날짜] /api/histories/duration
export interface HistoryDurationResponse {
  startDate: Date;
  endDate: Date;
}
