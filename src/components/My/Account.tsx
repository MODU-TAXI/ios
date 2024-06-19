import React from 'react';
import { Text, View } from 'react-native';

import { GetBankComponent } from '@components/Calculate/GetBank';

import { banks, Account } from '@type/entity/account';

interface AccountComponentProps {
  account: Account;
}

const AccountComponent: React.FC<AccountComponentProps> = ({ account }) => {
  return (
    <View
      className={`mt-4 flex-row items-center rounded-xl border-[1px] border-[#E2E2E2] bg-white px-6 py-4`}
    >
      <GetBankComponent bank={account.bank} />
      <Text className="ml-2 mr-1 text-[16px] font-medium tracking-tight">
        {banks[account.bank]}
      </Text>
      <Text className="text-[16px] font-medium tracking-tight">{account.accountNumber}</Text>
    </View>
  );
};

export default AccountComponent;
