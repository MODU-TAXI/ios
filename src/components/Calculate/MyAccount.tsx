import React from 'react';
import { Text, Pressable } from 'react-native';

import { GetBankComponent } from '@components/Calculate/GetBank';

import { Bank, banks, Account } from '@type/entity/account';

interface MyAccountComponentProps {
  account: Account;
  isSelected: boolean;
  onSelect: (accountId: number, account: string, bank: Bank) => void;
}

const MyAccountComponent: React.FC<MyAccountComponentProps> = ({
  account,
  isSelected,
  onSelect,
}) => {
  return (
    <Pressable
      className={`mt-4 flex-row items-center rounded-xl border-[1px] ${isSelected ? 'border-main' : 'border-[#E2E2E2]'} bg-white px-6 py-4`}
      onPress={() =>
        onSelect(account.id, account.accountNumber, {
          name: banks[account.bank],
          identifier: account.bank,
        })
      }
    >
      <GetBankComponent bank={account.bank} />
      <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
        {banks[account.bank]}
      </Text>
      <Text className="text-[16px] font-medium tracking-tight">{account.accountNumber}</Text>
    </Pressable>
  );
};

export default MyAccountComponent;
