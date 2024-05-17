/** zoom 레벨에 따른 range 조정 */
export const calculateRadius = (zoom: number) => {
  return Math.round(15000000 * Math.pow(2, -zoom));
};

/** zoom 레벨에 따른 카메라 센터 조정 */
export const calculateCenter = (zoom: number) => {
  return 0.002 / Math.pow(2, zoom - 13.5);
};
