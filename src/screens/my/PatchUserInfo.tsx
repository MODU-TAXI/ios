import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComponent from '@components/Header';

import { PatchNicknameScreenProps, PatchUserInfoScreenProps } from '@type/param/loginStack';

const PatchUserInfoScreen = ({ navigation }: PatchUserInfoScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="개인정보 수정" />
      <View>
        <Text>개인정보 수정 페이지</Text>
      </View>
    </SafeAreaView>
  );
};

export default PatchUserInfoScreen;
