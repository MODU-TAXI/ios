import { Alarm } from '@type/entity/alarm';

// [알림들 가져오기] /api/alarms
export interface GetAlaramsResponse {
  hasNext: boolean;
  page: number;
  result: Alarm[];
}

// [안읽은 알람 개수 가져오기] /api/alarms/counts
export interface GetAlarmsCountResponse {
  counts: number;
}
