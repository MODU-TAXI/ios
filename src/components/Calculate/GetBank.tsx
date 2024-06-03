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
  NH농협: NH,
  카카오뱅크: KAKAO,
  KB국민: KB,
  토스뱅크: TOSS,
  신한: SINHAN,
  우리: URI,
  IBK기업: IBK,
  하나: HANA,
  새마을: SAEMAUL,
  부산: BUSAN,
  대구: DAEGU,
  케이뱅크: K,
  신협: SH,
  우체국: POST,
  SC제일: SC,
  광주: GWANGJU,
  수협: SUHYUP,
  전북: JUNBOOK,
  경남: BUSAN,
  저축은행: SB,
  제주: JEJU,
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
