import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';

import { PatchAccountScreenProps } from '@type/param/loginStack';

const PatchAccountScreen = ({ navigation }: PatchAccountScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="계좌 수정" />
      <View>
        <Text>계좌 수정 페이지</Text>
      </View>
    </SafeAreaView>
  );
};

export default PatchAccountScreen;
