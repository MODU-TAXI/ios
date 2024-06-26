export type Alarm = {
  type:
    | 'PARTICIPATE_REQUEST'
    | 'MATCHING_SUCCESS'
    | 'MATCHING_COMPLETE'
    | 'REPORT_SUCCESS'
    | 'PAYMENT_REQUEST'
    | 'PAYMENT_REQUEST_COMPLETE'
    | 'PAYMENT_ALL_COMPLETE';
  message: string;
  resourceId: number;
  dateTime: Date;
};
