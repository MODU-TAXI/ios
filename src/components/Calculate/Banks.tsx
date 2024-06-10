import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { GetBankComponent } from './GetBank';

const banks = [
  { name: 'NH농협' },
  { name: '카카오뱅크' },
  { name: 'KB국민' },
  { name: '토스뱅크' },
  { name: '신한' },
  { name: '우리' },
  { name: 'IBK기업' },
  { name: '하나' },
  { name: '새마을' },
  { name: '부산' },
  { name: '대구' },
  { name: '케이뱅크' },
  { name: '신협' },
  { name: '우체국' },
  { name: 'SC제일' },
  { name: '광주' },
  { name: '수협' },
  { name: '전북' },
  { name: '경남' },
  { name: '저축은행' },
  { name: '제주' },
];

interface BanksComponentProps {
  closeBankModal: (index: number) => void;
  setBank: React.Dispatch<React.SetStateAction<string>>;
}

const BanksComponent: React.FC<BanksComponentProps> = ({ closeBankModal, setBank }) => {
  const selectBank = (bank: string) => {
    setBank(bank);
    closeBankModal(0);
  };

  return (
    <View style={styles.gridContainer}>
      {banks.map((bank, index) => {
        return (
          <Pressable key={index} style={styles.bankItem} onPress={() => selectBank(bank.name)}>
            <GetBankComponent bank={bank.name} />
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
