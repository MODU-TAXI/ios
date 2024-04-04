import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';
import { RootStackParamList } from '@type/ParamLists';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const EmailAuthenticationCodeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [code, setCode] = useState<string>(''); // 인증코드
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true); // 버튼활성화
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(180); // 타이머 시간

  const toNext = async (): Promise<void> => {
    navigation.navigate('CompleteSignUpScreen');
  };

  // 인증번호 재전송
  const resendCode = () => {
    setTime(180); // 재전송시 timer 재설정
  };

  // 입력 되었을때 버튼 활성화
  useEffect(() => {
    if (code && time !== 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);

      // 인증번호 만료시 에러 메세지 생성
      if (time == 0) {
        setErrorMessage('인증번호가 만료되었습니다!');
      }
    }
  }, [code, time]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt={80} dealt={80} />
      </View>

      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">적어주신 이메일로</Text>
          <Text className="text-xl font-bold">인증번호가 전송됐어요!</Text>
        </View>

        {/* Input 컴포넌트 */}
        <View className="mt-6">
          <InputBoxComponent
            title="인증번호"
            value={code}
            setValue={setCode}
            placeholder="인증번호를 입력해주세요"
            timer={true}
            time={time}
            setTime={setTime}
          />
        </View>

        {/* 경고 메세지 */}
        <View className="flex-row justify-between mt-2 px-2">
          <Text className="text-error font-medium">{errorMessage}</Text>

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
            borderColor={'border-black'}
            textColor={'white'}
            text={'확인'}
            disabled={buttonDisabled}
            onPress={toNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailAuthenticationCodeScreen;
