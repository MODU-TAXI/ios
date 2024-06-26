import { Alarm } from '@type/entity/alarm';

// [알림들 가져오기] /api/alarms
export interface getAlaramsResponse {
  hasNext: boolean;
  page: number;
  result: Alarm[];
}
