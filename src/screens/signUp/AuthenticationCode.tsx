import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/ParamLists';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';

const AuthenticationCodeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [code, setCode] = useState<string>('');

  const toNext = async (): Promise<void> => {
    navigation.navigate('CompleteSignUpScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">적어주신 이메일로</Text>
          <Text className="text-xl font-bold">인증번호가 전송됐어요!</Text>
        </View>

        {/* Input 컴포넌트 */}
        <InputBoxComponent
          title="학교 이메일"
          value={code}
          setValue={setCode}
          placeholder=""
        />

        {/* 경고 메세지 */}
        <View>
          <Text className="text-rose-600">인증번호가 잘못되었습니다!</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 확인 버튼 */}
        <ButtonComponent
          color={'bg-black'}
          text={'확인'}
          textColor={'white'}
          onPress={toNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthenticationCodeScreen;
