import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import InputBoxComponent from '@components/InputBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { emailState, userInfoState } from '@recoil/recoil';

import { useEmailConfirm, useEmailAuthentication } from '@hooks/api/member.mail';

import { InfoToastMessage } from '@utils/toastMessage';

import { PatchSchoolEmailAuthenticationScreenProps } from '@type/param/loginStack';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const PatchSchoolEmailAuthenticationScreen = ({
  navigation,
}: PatchSchoolEmailAuthenticationScreenProps) => {
  const email = useRecoilValue(emailState); // 재전송할 이메일
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [code, setCode] = useState<string>(''); // 인증코드
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(180); // 타이머 시간

  const { mutateAsync: emailConfirm, isPending: emailConfirmPending } =
    useEmailConfirm(setErrorMessage);
  const { mutateAsync: emailAuthentication, isPending: emailAuthenticationPending } =
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

    setUserInfo({
      id: userInfo.id,
      name: userInfo.name,
      nickname: userInfo.nickname,
      gender: userInfo.gender,
      phoneNumber: userInfo.phoneNumber,
      email: email,
      imageUrl: userInfo.imageUrl,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });
  };

  // 인증번호 만료시 에러 메세지 생성
  useEffect(() => {
    if (time == 0) {
      setErrorMessage('인증번호가 만료되었습니다!');
    }
  }, [time]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {(emailConfirmPending || emailAuthenticationPending) && <TransparentLoadingComponent />}

      <HeaderComponent title="학교 이메일 인증" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          <View className="mx-6 flex-1">
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
            <View className="mt-2 flex-row justify-between px-2">
              <Text className="font-medium text-error">{errorMessage}</Text>

              <Pressable onPress={resendMail}>
                <ReSendCodeButtonSvg />
              </Pressable>
            </View>

            {/* 버튼을 아래로 내리기 위한 View */}
            <View className="flex-1"></View>

            {/* 확인 버튼 */}
            <View className="mx-3 mb-11">
              <ButtonComponent
                color={'bg-main'}
                borderColor={'border-main'}
                textColor={'white'}
                text={'확인'}
                disabled={!code}
                onPress={confirmEmail}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PatchSchoolEmailAuthenticationScreen;
