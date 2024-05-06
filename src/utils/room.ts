export const translateCategory = (tag: string): string => {
  switch (tag) {
    case 'ONLY_WOMAN':
      return '여자만';

    case 'ONLY_MAN':
      return '남자만';

    case 'MANNER':
      return '매너탑승';

    case 'QUIET':
      return '조용히';

    case 'STUDENT_CERTIFICATION':
      return '학생인증';

    default:
      return '기타';
  }
};
