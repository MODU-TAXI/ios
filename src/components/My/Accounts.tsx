import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AccountComponent from '@components/My/Account';

import { Account } from '@type/entity/account';

interface AccountsComponentProps {
  accounts: Account[];
}

const AccountsComponent: React.FC<AccountsComponentProps> = ({ accounts }) => {
  return (
    <View>
      <ScrollView>
        {accounts.map((account: Account) => (
          <AccountComponent key={account.id} account={account} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AccountsComponent;
