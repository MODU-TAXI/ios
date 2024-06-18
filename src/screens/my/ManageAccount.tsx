import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import AccountsComponent from '@components/My/Accounts';

import { useGetAccounts } from '@hooks/api/account';

import { ManageAccountScreenProps } from '@type/param/loginStack';

const ManageAccountScreen = ({ navigation }: ManageAccountScreenProps) => {
  const { accounts } = useGetAccounts(); // 계좌 정보들 가져오기

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="계좌 관리" />

      <View className="flex-1 px-4 pt-4">
        <View className="flex-1 px-3">
          <AccountsComponent accounts={accounts.accounts} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageAccountScreen;
