import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const banks = [
  { name: 'NH 농협', icon: NH },
  { name: '카카오뱅크', icon: KAKAO },
  { name: 'KB국민', icon: KB },
  { name: '토스뱅크', icon: TOSS },
  { name: '신한', icon: SINHAN },
  { name: '우리', icon: URI },
  { name: 'IBK기업', icon: IBK },
  { name: '하나', icon: HANA },
  { name: '새마을', icon: SAEMAUL },
  { name: '부산', icon: BUSAN },
  { name: '대구', icon: DAEGU },
  { name: '케이뱅크', icon: K },
  { name: '신협', icon: SH },
  { name: '우체국', icon: POST },
  { name: 'SC제일', icon: SC },
  { name: '광주', icon: GWANGJU },
  { name: '수협', icon: SUHYUP },
  { name: '전북', icon: JUNBOOK },
  { name: '경남', icon: BUSAN },
  { name: '저축은행', icon: SB },
  { name: '제주', icon: JEJU },
];

const BanksComponent: React.FC = () => {
  return (
    <View style={styles.gridContainer}>
      {banks.map((bank, index) => {
        const Icon = bank.icon;
        return (
          <View key={index} style={styles.bankItem}>
            <Icon />
            <Text style={styles.bankText}>{bank.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bankItem: {
    width: '30%',
    alignItems: 'center',
    padding: 8,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 8,
  },
  bankText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default BanksComponent;
