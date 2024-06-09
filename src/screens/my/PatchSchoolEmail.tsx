import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';

import { PatchNicknameScreenProps, PatchSchoolEmailScreenProps } from '@type/param/loginStack';

const PatchSchoolEmailScreen = ({ navigation }: PatchSchoolEmailScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="학교 인증" />
      <View>
        <Text>학교인증 페이지</Text>
      </View>
    </SafeAreaView>
  );
};

export default PatchSchoolEmailScreen;
