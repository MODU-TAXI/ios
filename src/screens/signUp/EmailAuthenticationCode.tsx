import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

import { RootStackParamList } from 'src/types/ParamLists';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';

import { emailState } from '@recoil/recoil';

import {
  useEmailConfirm,
  useEmailAuthentication,
} from '@hooks/api/member.mail';

import { InfoToastMessage } from '@utils/toastMessage';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const EmailAuthenticationCodeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const email = useRecoilValue(emailState); // 재전송할 이메일 (recoil value 사용)
  const [code, setCode] = useState<string>(''); // 인증코드
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(180); // 타이머 시간

  const { mutateAsync: emailConfirm } = useEmailConfirm(setErrorMessage);
  const { mutateAsync: emailAuthentication } =
    useEmailAuthentication(setErrorMessage);

  // 인증번호 재전송
  const resendMail = async (): Promise<void> => {
    await emailAuthentication({ mailAddress: email });
    InfoToastMessage('인증번호가 재전송 되었습니다');
    setTime(180); // 재전송시 timer 재설정
  };

  // 인증 코드확인
  const confirmEmail = async (): Promise<void> => {
    await emailConfirm({ certCode: code });
    navigation.navigate('SurveyFirstScreen');
  };

  // 인증번호 만료시 에러 메세지 생성
  useEffect(() => {
    if (time == 0) {
      setErrorMessage('인증번호가 만료되었습니다!');
    }
  }, [time]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="h-1 mt-[11px]">
            <ProgressBarComponent previousDealt={40} dealt={40} />
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

              <Pressable onPress={resendMail}>
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
                disabled={false}
                onPress={confirmEmail}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EmailAuthenticationCodeScreen;
