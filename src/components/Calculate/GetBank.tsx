import React from 'react';

import K from '@assets/images/Banks/K.svg';
import NH from '@assets/images/Banks/NH.svg';
import KB from '@assets/images/Banks/KB.svg';
import SH from '@assets/images/Banks/SH.svg';
import SC from '@assets/images/Banks/SC.svg';
import SB from '@assets/images/Banks/SB.svg';
import URI from '@assets/images/Banks/URI.svg';
import IBK from '@assets/images/Banks/IBK.svg';
import TOSS from '@assets/images/Banks/TOSS.svg';
import HANA from '@assets/images/Banks/HANA.svg';
import POST from '@assets/images/Banks/POST.svg';
import JEJU from '@assets/images/Banks/JEJU.svg';
import KAKAO from '@assets/images/Banks/KAKAO.svg';
import BUSAN from '@assets/images/Banks/BUSAN.svg';
import DAEGU from '@assets/images/Banks/DAEGU.svg';
import SINHAN from '@assets/images/Banks/SINHAN.svg';
import SUHYUP from '@assets/images/Banks/SUHYUP.svg';
import SAEMAUL from '@assets/images/Banks/SAEMAUL.svg';
import GWANGJU from '@assets/images/Banks/GWANGJU.svg';
import JUNBOOK from '@assets/images/Banks/JUNBOOK.svg';

interface BankIcon {
  [key: string]: React.ComponentType;
}

const bankIcons: BankIcon = {
  NH: NH,
  KAKAO: KAKAO,
  KB: KB,
  TOSS: TOSS,
  SINHAN: SINHAN,
  WOORI: URI,
  IBK: IBK,
  HANA: HANA,
  MG: SAEMAUL,
  BUSAN: BUSAN,
  DAEGU: DAEGU,
  K: K,
  SHINHYUP: SH,
  POST: POST,
  SC: SC,
  GWANGJU: GWANGJU,
  SUHYUP: SUHYUP,
  JEONBUK: JUNBOOK,
  BNK: BUSAN,
  SB: SB,
  JEJU: JEJU,
};

interface GetBankComponentProps {
  bank: string;
}

export const GetBankComponent: React.FC<GetBankComponentProps> = ({ bank }) => {
  const IconComponent = bankIcons[bank];
  if (IconComponent) {
    return <IconComponent />;
  } else {
    return null; // 또는 기본 아이콘을 반환하거나 에러 처리
  }
};
