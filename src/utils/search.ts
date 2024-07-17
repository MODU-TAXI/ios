/** 스트링의 html 태그 제거 */
export const deleteTagTitle = (title: string) => {
  const newTitle = title
    .replace(/<\/?b>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");

  return newTitle;
}

/** 두 지점 사이의 거리를 km 기준으로 리턴 */
export const calculateDist = (lat1: number, long1: number, lat2: number, long2: number) => {
  const radius = 6371;
  const toRadian = Math.PI / 180;

  const deltaLat = Math.abs(lat1 - lat2) * toRadian;
  const deltaLong = Math.abs(long1 - long2) * toRadian;
  const sinDeltaLat = Math.sin(deltaLat / 2);
  const sinDeltaLong = Math.sin(deltaLong / 2);
  const squareRoot = Math.sqrt(
    sinDeltaLat * sinDeltaLat +
    Math.cos(lat1 * toRadian) * Math.cos(lat2 * toRadian) * sinDeltaLong * sinDeltaLong
  );

  const distance = 2 * radius * Math.asin(squareRoot);
  return distance;
}

/** km 기준의 거리값을 스트링으로 처리하여 변환 */
export const modifyDistStr = (distance: number) => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  } else {
    return `${distance.toFixed(1)}km`;
  }
}