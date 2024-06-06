// 문자열 자르고 나머지 .. 처리하기
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, 0 + maxLength);
  return truncated + '...';
};
