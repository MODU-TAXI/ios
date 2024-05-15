import { View, Text, Pressable } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';

import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';

import { GetAxiosInstance } from '@axios/axios.method';

const square = (number: number) => {
  console.log('제곱 계산중...');
  return number * number;
};

const TestScreen = () => {
  const test = async () => {
    await GetAxiosInstance<any>('/api/fcm/test');
  };

  return (
    <SafeAreaView className="bg-white">
      <Pressable onPress={test}>
        <View>
          <Text>ssss</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default TestScreen;
