import React, { useState, useEffect } from 'react';
import {
  Pressable,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';

import { signUp } from '@server/api/member';
import { signUpUserState } from '@recoil/recoil';
import { useSmsAuthentication, useSmsConfirm } from '@hooks/api/member.sms';
import { setAccessToken, setRefreshToken } from '@utils/token';
import { InfoToastMessage } from '@utils/toastMessage';
import { RootStackParamList } from '@type/ParamLists';
import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const PhoneAuthenticationCodeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const signUpUser = useRecoilValue(signUpUserState); // 앞에서 받아온 회원가입 유저 정보
  const [code, setCode] = useState<string>(''); // 인증코드
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(300); // 타이머 시간

  const { mutateAsync: smsConfirm } = useSmsConfirm(setErrorMessage);

  const { mutateAsync: smsAuthentication } =
    useSmsAuthentication(setErrorMessage);

  // 인증번호 만료시 에러 메세지 생성
  useEffect(() => {
    if (time == 0) {
      setErrorMessage('인증번호가 만료되었습니다!');
    }
  }, [time]);

  // 회원가입
  const sendCode = async (): Promise<void> => {
    await smsConfirm({
      key: signUpUser.key,
      phoneNumber: signUpUser.phoneNumber,
      certificationCode: code,
    });

    const response = await signUp(signUpUser);

    const { accessToken, refreshToken } = response;

    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    navigation.navigate('SchoolAuthenticationScreen');
  };

  // 인증번호 재전송
  const resendCode = async () => {
    await smsAuthentication({
      key: signUpUser.key,
      phoneNumber: signUpUser.phoneNumber,
    });
    InfoToastMessage('인증번호가 재전송 되었습니다');
    setTime(300); // 재전송시 timer 재설정
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
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
                timer={true}
                time={time}
                setTime={setTime}
              />
            </View>

            {/* 경고 메세지 및 재전송 버튼 */}
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
                disabled={!code || !time}
                onPress={sendCode}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PhoneAuthenticationCodeScreen;
