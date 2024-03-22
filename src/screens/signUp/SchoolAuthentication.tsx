import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../type/ParamLists';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';

const SchoolAuthenticationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState<string>('');

  const toEnd = async (): Promise<void> => {
    navigation.navigate('CompleteSignUpScreen');
  };

  const toNext = async (): Promise<void> => {
    navigation.navigate('AuthenticationCodeScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt="w-3/5" dealt="w-4/5" />
      </View>
      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">학교 인증을 하면</Text>
          <Text className="text-xl font-bold">매칭률이 72% 이상 올라가요!</Text>
        </View>

        {/* Input 컴포넌트 */}
        <InputBoxComponent
          title="학교 이메일"
          value={email}
          setValue={setEmail}
          placeholder="moduteam@inha.edu"
        />

        {/* 경고 메세지 */}
        <View>
          <Text className="text-rose-600">잘못된 이메일 형식입니다!</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 다음에 하기 버튼 */}
        <View className="mx-3 mb-3">
          <ButtonComponent
            color={'bg-disabled'}
            text={'다음에 할래요'}
            textColor={'white'}
            onPress={toEnd}
            disabled={false}
          />
        </View>

        {/* 확인 버튼 */}
        <View className="mx-3 mb-11">
          <ButtonComponent
            color={'bg-black'}
            text={'확인'}
            textColor={'white'}
            onPress={toNext}
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SchoolAuthenticationScreen;
