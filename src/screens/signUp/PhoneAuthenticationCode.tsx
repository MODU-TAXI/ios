import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';
import { RootStackParamList } from '@type/ParamLists';

import ReSendCodeButtonSvg from '@assets/images/signUp/PhoneAuthenticationCode/ReSendCodeButton.svg';

const PhoneAuthenticationCodeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [code, setCode] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const toNext = async (): Promise<void> => {
    navigation.navigate('SurveyFirstScreen');
  };

  // 인증번호 재전송
  const resendCode = () => {
    console.log('send!');
  };

  // 입력 되었을때 버튼 활성화
  useEffect(() => {
    if (code) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [code]);

  return (
    <SafeAreaView className="flex-1">
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt={20} dealt={20} />
      </View>

      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">적어주신 번호로</Text>
          <Text className="text-xl font-bold">인증번호가 전송됐어요!</Text>
        </View>

        {/* code Input 컴포넌트 */}
        <View className="mt-6">
          <InputBoxComponent
            title="인증번호"
            value={code}
            setValue={setCode}
            placeholder="인증번호를 입력해주세요"
          />
        </View>

        {/* 경고 메세지 및 재전송 버튼 */}
        <View className="flex-row justify-between mt-2 px-2">
          <Text className="text-error font-medium">인증번호가 틀렸어요!</Text>

          <Pressable onPress={resendCode}>
            <ReSendCodeButtonSvg />
          </Pressable>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 확인 버튼 */}
        <View className="mx-3 mb-11">
          <ButtonComponent
            color={'bg-black'}
            text={'확인'}
            textColor={'white'}
            onPress={toNext}
            disabled={buttonDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhoneAuthenticationCodeScreen;
