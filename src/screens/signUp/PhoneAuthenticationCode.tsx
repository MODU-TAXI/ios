import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { UserRecoil } from '@recoil/types/user';
import { TempUserRecoil } from '@recoil/types/user';
import { userRecoilState } from '@recoil/states/user';
import { tempUserRecoilState } from '@recoil/states/user';

import { signUp } from '@server/api/member';

import { useFcmToken } from '@hooks/fcm';
import { useSmsConfirm, useSmsAuthentication } from '@hooks/api/member.sms';

import { InfoToastMessage } from '@utils/toastMessage';
import { setAccessToken, setRefreshToken } from '@utils/token';

import { PhoneAuthenticationCodeScreenProps } from '@type/param/rootStack';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const PhoneAuthenticationCodeScreen = ({ navigation }: PhoneAuthenticationCodeScreenProps) => {
  const tempUserRecoil = useRecoilValue<TempUserRecoil>(tempUserRecoilState); // 앞에서 받아온 회원가입 유저 정보
  const setUserRecoil = useSetRecoilState<UserRecoil>(userRecoilState);
  const [code, setCode] = useState<string>(''); // 인증코드
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(300); // 타이머 시간
  const [fcmToken, setFcmToken] = useFcmToken();

  const { mutateAsync: smsConfirm, isPending: smsConfirmPending } = useSmsConfirm(setErrorMessage);

  const { mutateAsync: smsAuthentication, isPending: smsAuthenticationPending } =
    useSmsAuthentication(setErrorMessage);

  // 회원가입
  const sendCode = async (): Promise<void> => {
    await smsConfirm({
      key: tempUserRecoil.key,
      phoneNumber: tempUserRecoil.phoneNumber,
      certificationCode: code,
    });

    const response = await signUp({ ...tempUserRecoil, fcmToken: fcmToken });

    const { accessToken, refreshToken } = response.tokenResponse;

    setUserRecoil(response.memberInfoResponse);

    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterNicknameScreen' }],
    });
  };

  // 인증번호 재전송
  const resendCode = async () => {
    await smsAuthentication({
      key: tempUserRecoil.key,
      phoneNumber: tempUserRecoil.phoneNumber,
    });
    InfoToastMessage('인증번호가 재전송 되었습니다');
    setTime(300); // 재전송시 timer 재설정
  };

  // 다시 입력
  const goBack = () => {
    navigation.goBack();
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

            <View className="mx-3 mb-3">
              <ButtonComponent
                color={'bg-white'}
                borderColor={'border-disabled'}
                text={'전화번호 다시입력'}
                textColor={'disabled'}
                onPress={goBack}
                disabled={false}
              />
            </View>

            {/* 확인 버튼 */}
            <View className="mx-3 mb-10">
              <ButtonComponent
                color={'bg-main'}
                borderColor={'border-main'}
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
