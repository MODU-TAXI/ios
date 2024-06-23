import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { emailState, userInfoState } from '@recoil/recoil';

import { useEmailConfirm, useEmailAuthentication } from '@hooks/api/member.mail';

import { InfoToastMessage } from '@utils/toastMessage';

import { EmailAuthenticationCodeScreenProps } from '@type/param/rootStack';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const EmailAuthenticationCodeScreen = ({ navigation }: EmailAuthenticationCodeScreenProps) => {
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
      matchingCount: userInfo.matchingCount,
      blocked: userInfo.blocked,
    });

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
      {(emailConfirmPending || emailAuthenticationPending) && <TransparentLoadingComponent />}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="mt-[11px] h-1">
            <ProgressBarComponent previousDealt={60} dealt={60} />
          </View>

          <View className="mx-6 flex-1">
            {/* 입력란 설명 */}
            <View className="mt-14 flex">
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

export default EmailAuthenticationCodeScreen;
