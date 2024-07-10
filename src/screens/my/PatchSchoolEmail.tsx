import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import InputBoxComponent from '@components/InputBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { emailState } from '@recoil/recoil';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useEmailAuthentication } from '@hooks/api/member.mail';

import { PatchSchoolEmailScreenProps } from '@type/param/loginStack';

const PatchSchoolEmailScreen = ({ navigation }: PatchSchoolEmailScreenProps) => {
  useDeleteAllNotifee();

  const [email, setEmail] = useRecoilState<string>(emailState); // 이메일
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지

  const { mutateAsync: emailAuthentication, isPending: emailAuthenticationPending } =
    useEmailAuthentication(setErrorMessage);

  // 인증 메일 보내기
  const sendMail = async (): Promise<void> => {
    await emailAuthentication({ mailAddress: email });

    navigation.navigate('PatchSchoolEmailAuthenticationScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {emailAuthenticationPending && <TransparentLoadingComponent />}
      <HeaderComponent title="학교 이메일 인증" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          <View className="mx-6 flex-1">
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

            {/* 확인 버튼 */}
            <View className="mx-3 mb-11">
              <ButtonComponent
                color={'bg-main'}
                borderColor={'border-main'}
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

export default PatchSchoolEmailScreen;
