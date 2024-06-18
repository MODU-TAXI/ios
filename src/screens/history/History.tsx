import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetHistories } from '@hooks/api/history';

import { HistoryScreenProps } from '@type/param/loginStack';

const HistoryScreen = ({ navigation }: HistoryScreenProps) => {
  const { data: histories } = useGetHistories();

  const toHistoryDetailScreen = (historyId: number) => {
    navigation.navigate('HistoryDetailScreen', { historyId: historyId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {histories.historySimpleListResponse.map((history) => {
        return (
          <Pressable onPress={() => toHistoryDetailScreen(history.historyId)}>
            <Text>이용내역 상세페이지</Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
};

export default HistoryScreen;
