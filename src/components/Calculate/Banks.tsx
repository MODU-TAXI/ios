import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { GetBankComponent } from './GetBank';

import { Bank } from '@type/entity/account';

const banks = [
  { identifier: 'NH', name: 'NH농협' },
  { identifier: 'KAKAO', name: '카카오뱅크' },
  { identifier: 'KB', name: 'KB국민' },
  { identifier: 'TOSS', name: '토스뱅크' },
  { identifier: 'SINHAN', name: '신한' },
  { identifier: 'WOORI', name: '우리' },
  { identifier: 'IBK', name: 'IBK기업' },
  { identifier: 'HANA', name: '하나' },
  { identifier: 'MG', name: '새마을' },
  { identifier: 'BUSAN', name: '부산' },
  { identifier: 'DAEGU', name: '대구' },
  { identifier: 'K', name: '케이뱅크' },
  { identifier: 'SHINHYUP', name: '신협' },
  { identifier: 'POST', name: '우체국' },
  { identifier: 'SC', name: 'SC제일' },
  { identifier: 'GWANGJU', name: '광주' },
  { identifier: 'SUHYUP', name: '수협' },
  { identifier: 'JEONBUK', name: '전북' },
  { identifier: 'BNK', name: '경남' },
  { identifier: 'SB', name: '저축은행' },
  { identifier: 'JEJU', name: '제주' },
];

interface BanksComponentProps {
  closeBankModal: (index: number) => void;
  setBank: React.Dispatch<React.SetStateAction<Bank>>;
}

const BanksComponent: React.FC<BanksComponentProps> = ({ closeBankModal, setBank }) => {
  const selectBank = (bank: Bank) => {
    setBank({ identifier: bank.identifier, name: bank.name });
    closeBankModal(0);
  };

  return (
    <View style={styles.gridContainer}>
      {banks.map((bank, index) => {
        return (
          <Pressable key={index} style={styles.bankItem} onPress={() => selectBank(bank)}>
            <GetBankComponent bank={bank.identifier} />
            <Text style={styles.bankText}>{bank.name}</Text>
          </Pressable>
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
    width: 100,
    height: 64,
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
