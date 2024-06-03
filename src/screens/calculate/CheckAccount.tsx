import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/Calculate/InputBox';

import { calculateState } from '@recoil/recoil';

import { CheckAccountScreenProps } from '@type/param/loginStack';

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

const CheckAccountScreen = ({ navigation }: CheckAccountScreenProps) => {
  const calculate = useRecoilValue(calculateState);
  const [account, setAccount] = useState<string>(''); // 계좌번호
  const [bankModalIndex, setBankModalIndex] = useState<number>(0); // modal index

  const getBankIcon = (bankName: string) => {
    const IconComponent = bankIcons[bankName];
    if (IconComponent) {
      return <IconComponent />;
    } else {
      return null; // 또는 기본 아이콘을 반환하거나 에러 처리
    }
  };

  const toNext = () => {
    console.log('next!');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="도착완료 정산하기" />
      <View className="flex-1 px-4 pt-8">
        <View className="flex-1 px-3">
          {/* 글씨 */}
          <View className="flex-col">
            <Text className="text-xl font-bold tracking-tight">아래 계좌번호로</Text>
            <Text className="text-xl font-bold tracking-tight">정산을 요청할게요!</Text>
          </View>

          {/* 입력창 */}
          <View className="mt-4 flex-row items-center rounded-xl border-[1px] border-[#E2E2E2] bg-white px-6 py-4">
            {getBankIcon(calculate.bank)}
            <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
              {calculate.bank}
            </Text>
            <Text className="text-[16px] font-medium tracking-tight">{calculate.account}</Text>
          </View>

          <View className="mt-2 flex-col justify-start px-2">
            <Text className="text-[12px] tracking-tight text-[#5D5D5D]">
              계좌번호를 잘못 입력했다면
            </Text>
            <Text className="text-[12px] tracking-tight text-[#5D5D5D]">
              정산받기 어려워요 꼼꼼히 확인해주세요!
            </Text>
          </View>
        </View>

        <View className="mb-4 px-3">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            textColor={'white'}
            text={'확인'}
            disabled={false}
            onPress={toNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckAccountScreen;
