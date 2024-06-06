import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { emailState } from '@recoil/recoil';

import { useEmailAuthentication } from '@hooks/api/member.mail';

import { SchoolAuthenticationScreenProps } from '@type/param/rootStack';

const SchoolAuthenticationScreen = ({ navigation }: SchoolAuthenticationScreenProps) => {
  const [email, setEmail] = useRecoilState<string>(emailState); // 이메일
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지

  const { mutateAsync: emailAuthentication, isPending: emailAuthenticationPending } =
    useEmailAuthentication(setErrorMessage);

  // 인증 메일 보내기
  const sendMail = async (): Promise<void> => {
    await emailAuthentication({ mailAddress: email });
    navigation.navigate('EmailAuthenticationCodeScreen');
  };

  // 다음에 하기
  const toEnd = async (): Promise<void> => {
    navigation.navigate('SurveyFirstScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {emailAuthenticationPending && <TransparentLoadingComponent />}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="mt-[11px] h-1">
            <ProgressBarComponent previousDealt={0} dealt={40} />
          </View>

          <View className="mx-6 flex-1">
            {/* 입력란 설명 */}
            <View className="mt-14 flex">
              <Text className="text-xl font-bold">학교 인증을 하면</Text>
              <Text className="text-xl font-bold">
                매칭률이 <Text className="text-basic">72% </Text>이상 올라가요!
              </Text>
            </View>

            {/* Input 컴포넌트 */}
            <View className="mt-6">
              <InputBoxComponent
                title="학교 이메일"
                value={email}
                setValue={setEmail}
                placeholder="moduteam@inha.edu"
              />
            </View>

            {/* 경고 메세지 */}
            {errorMessage && (
              <View className="mt-2 px-2">
                <Text className="font-medium text-error">{errorMessage}</Text>
              </View>
            )}

            {/* 버튼을 아래로 내리기 위한 View */}
            <View className="flex-1"></View>

            {/* 다음에 하기 버튼 */}
            <View className="mx-3 mb-3">
              <ButtonComponent
                color={'bg-white'}
                borderColor={'border-disabled'}
                text={'다음에 할래요'}
                textColor={'disabled'}
                onPress={toEnd}
                disabled={false}
              />
            </View>

            {/* 확인 버튼 */}
            <View className="mx-3 mb-11">
              <ButtonComponent
                color={'bg-black'}
                borderColor={'border-black'}
                textColor={'white'}
                text={'확인'}
                disabled={!email}
                onPress={sendMail}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SchoolAuthenticationScreen;
