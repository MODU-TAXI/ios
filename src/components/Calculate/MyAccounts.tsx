import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { Dispatch, useState, SetStateAction } from 'react';

import MyAccountComponent from './MyAccount';

import { Bank, Account } from '@type/entity/account';

interface MyAccountsComponentProps {
  accounts: Account[];
  setAccount: Dispatch<SetStateAction<string>>;
  setBank: Dispatch<SetStateAction<Bank>>;
}

const MyAccountsComponent: React.FC<MyAccountsComponentProps> = ({
  accounts,
  setAccount,
  setBank,
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<number>(0);

  const onSelect = (accountId: number, account: string, bank: Bank) => {
    setSelectedAccountId(accountId);
    setAccount(account);
    setBank(bank);
  };

  return (
    <View className="mt-6">
      <Text className="px-1 text-[12px] font-medium tracking-tight text-[#7C7C7C]">
        등록된 계좌로 정산할까요?
      </Text>

      <ScrollView>
        {accounts.map((account: Account) => (
          <MyAccountComponent
            key={account.id}
            account={account}
            isSelected={selectedAccountId === account.id}
            onSelect={onSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyAccountsComponent;
