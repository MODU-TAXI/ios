import { RoomCategory } from '@type/entity/room';

export const translateCategory = (tag: string): RoomCategory => {
  switch (tag) {
    case 'ONLY_WOMAN':
      return {
        label: '여자만',
        textColor: 'text-gray500',
        bgColor: 'bg-box',
      };
    case 'ONLY_MAN':
      return {
        label: '남자만',
        textColor: 'text-gray500',
        bgColor: 'bg-box',
      };
    case 'MANNER':
      return {
        label: '매너탑승',
        textColor: 'text-gray500',
        bgColor: 'bg-box',
      };
    case 'QUIET':
      return {
        label: '조용히',
        textColor: 'text-gray500',
        bgColor: 'bg-box',
      };
    case 'STUDENT_CERTIFICATION':
      return {
        label: '학생인증',
        textColor: 'text-main',
        bgColor: 'bg-sub100',
      };
    default:
      return {
        label: '기타',
        textColor: 'text-gray500',
        bgColor: 'bg-box',
      };
  }
};
