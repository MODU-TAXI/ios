import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { GetBankComponent } from '@components/Calculate/GetBank';

import { banks, Account } from '@type/entity/account';

import DeleteAccountButton from '@assets/images/My/DeleteAccountButton.svg';

interface AccountComponentProps {
  account: Account;
  deleteAccount: (accountId: number) => void;
}

const AccountComponent: React.FC<AccountComponentProps> = ({ account, deleteAccount }) => {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <View
        className={`max-h-16 flex-1 flex-row items-center  truncate rounded-xl border-[#EBEBEB] bg-[#EBEBEB] px-6 py-4`}
      >
        <GetBankComponent bank={account.bank} />
        <Text className="ml-2 mr-1 text-[14px] font-medium tracking-tight text-[#3E3E3E]">
          {banks[account.bank]}
        </Text>
        <Text className="max-w-[150px] text-[14px] font-medium tracking-tight text-[#3E3E3E]">
          {account.accountNumber}
        </Text>
      </View>

      <Pressable onPress={() => deleteAccount(account.id)}>
        <DeleteAccountButton />
      </Pressable>
    </View>
  );
};

export default AccountComponent;
