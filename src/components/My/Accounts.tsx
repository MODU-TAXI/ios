import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AccountComponent from '@components/My/Account';

import { Account } from '@type/entity/account';

interface AccountsComponentProps {
  accounts: Account[];
  deleteAccount: (accountId: number) => void;
}

const AccountsComponent: React.FC<AccountsComponentProps> = ({ accounts, deleteAccount }) => {
  return (
    <View className="flex-1">
      {accounts.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-[16px] font-medium tracking-tight text-[#AFAFAF]">
            등록된 계좌가 없어요
          </Text>
        </View>
      ) : (
        <ScrollView>
          {accounts.map((account: Account) => (
            <AccountComponent key={account.id} account={account} deleteAccount={deleteAccount} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AccountsComponent;
