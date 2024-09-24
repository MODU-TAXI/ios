import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import InputBoxComponent from '@components/InputBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { TempUserRecoil } from '@recoil/type';
import { userInfoState, tempUserRecoilState } from '@recoil/recoil';

import { usePatchMember } from '@hooks/api/member';
import { useDeleteAllNotifee } from '@hooks/notifee';
import { useSmsChangeConfirm, useSmsChangeAuthentication } from '@hooks/api/member.sms';

import { InfoToastMessage, InfoTopToastMessage } from '@utils/toastMessage';

import { PatchUserInfoAuthenticationScreenProps } from '@type/param/loginStack';

import ReSendCodeButtonSvg from '@assets/images/SignUp/ReSendCodeButton.svg';

const PatchUserInfoAuthenticationScreen = ({
  navigation,
}: PatchUserInfoAuthenticationScreenProps) => {
  useDeleteAllNotifee();

  const [tempUserRecoil] = useRecoilState<TempUserRecoil>(tempUserRecoilState); // 앞에서 받아온 회원가입 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [code, setCode] = useState<string>(''); // 인증코드
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [time, setTime] = useState(300); // 타이머 시간

  const { mutateAsync: patchMemberMutate, isPending: patchMemberPending } = usePatchMember();

  const { mutateAsync: smsChangeAuthentication, isPending: smsChangeAuthenticationPending } =
    useSmsChangeAuthentication(setErrorMessage);

  const { mutateAsync: smsChangeConfirm, isPending: smsChangeConfirmPending } =
    useSmsChangeConfirm(setErrorMessage);

  // 인증번호 만료시 에러 메세지 생성
  useEffect(() => {
    if (time == 0) {
      setErrorMessage('인증번호가 만료되었습니다!');
    }
  }, [time]);

  // 회원정보 수정
  const patchUser = async (): Promise<void> => {
    // 번호 인증
    await smsChangeConfirm({
      phoneNumber: tempUserRecoil.phoneNumber,
      certificationCode: code,
    });

    // 회원 정보 수정
    await patchMemberMutate({
      imageUrl: userInfo.imageUrl,
      name: tempUserRecoil.name,
      gender: tempUserRecoil.gender,
      phoneNumber: tempUserRecoil.phoneNumber,
    });

    // recoil 데이터 수정
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: tempUserRecoil.name ?? prevUserInfo.name,
      gender: tempUserRecoil.gender ?? prevUserInfo.gender,
      phoneNumber: tempUserRecoil.phoneNumber ?? prevUserInfo.phoneNumber,
    }));

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });

    InfoToastMessage('개인정보가 수정되었습니다');
  };

  // 인증번호 재전송
  const resendCode = async () => {
    await smsChangeAuthentication({ phoneNumber: tempUserRecoil.phoneNumber });

    InfoTopToastMessage('인증번호가 재전송 되었습니다');
    setTime(300); // 재전송시 timer 재설정
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {(smsChangeConfirmPending || smsChangeAuthenticationPending || patchMemberPending) && (
        <TransparentLoadingComponent />
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          <HeaderComponent title="개인정보 수정" />

          <View className="mx-6 flex-1">
            {/* 입력란 설명 */}
            <View className="mt-6 flex">
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
                color={'bg-main'}
                borderColor={'border-main'}
                textColor={'white'}
                text={'확인'}
                disabled={!code || !time}
                onPress={patchUser}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PatchUserInfoAuthenticationScreen;
