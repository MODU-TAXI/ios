import React from 'react';
import { View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';
import AccountsComponent from '@components/My/Accounts';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useGetAccounts, useDeleteAccount } from '@hooks/api/account';

import { ManageAccountScreenProps } from '@type/param/loginStack';

const ManageAccountScreen = ({ navigation }: ManageAccountScreenProps) => {
  useDeleteAllNotifee();

  const { accounts, getAccountsRefetch } = useGetAccounts(); // 계좌 정보들 가져오기

  const { mutateAsync: deleteAccountMutate, isPending: deleteAccountPending } = useDeleteAccount();

  const deleteAccount = (accountId: number) => {
    Alert.alert('알림', '해당 계좌를 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },

      {
        text: '확인',
        onPress: async () => {
          await deleteAccountMutate(accountId);
          await getAccountsRefetch();
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {deleteAccountPending && <TransparentLoadingComponent />}

      <HeaderComponent title="계좌 관리" />

      <View className="flex-1 px-4 pt-4">
        <View className="flex-1 pl-3">
          <AccountsComponent accounts={accounts.accounts} deleteAccount={deleteAccount} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageAccountScreen;
