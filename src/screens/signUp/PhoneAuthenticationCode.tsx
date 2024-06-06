import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { userInfoState, signUpUserState } from '@recoil/recoil';

import { signUp } from '@server/api/member';

import { useFcmToken } from '@hooks/fcm';
import { useSmsConfirm, useSmsAuthentication } from '@hooks/api/member.sms';

import { InfoToastMessage } from '@utils/toastMessage';
import { setAccessToken, setRefreshToken } from '@utils/token';

import { PhoneAuthenticationCodeScreenProps } from '@type/param/rootStack';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const PhoneAuthenticationCodeScreen = ({ navigation }: PhoneAuthenticationCodeScreenProps) => {
  const signUpUser = useRecoilValue(signUpUserState); // 앞에서 받아온 회원가입 유저 정보
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [code, setCode] = useState<string>(''); // 인증코드
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(300); // 타이머 시간
  const [fcmToken] = useFcmToken();

  const { mutateAsync: smsConfirm, isPending: smsConfirmPending } = useSmsConfirm(setErrorMessage);

  const { mutateAsync: smsAuthentication, isPending: smsAuthenticationPending } =
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

    const response = await signUp({ ...signUpUser, fcmToken: fcmToken });

    const { accessToken, refreshToken } = response.tokenResponse;

    setUserInfo(response.memberInfoResponse);

    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    navigation.navigate('RegisterNicknameScreen');
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
      {(smsConfirmPending || smsAuthenticationPending) && <TransparentLoadingComponent />}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="mt-[11px] h-1">
            <ProgressBarComponent previousDealt={20} dealt={20} />
          </View>

          <View className="mx-6 flex-1">
            {/* 입력란 설명 */}
            <View className="mt-14 flex">
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
            <View className="mt-2 flex-row justify-between px-2">
              <Text className="font-medium text-error">{errorMessage}</Text>

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
