import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { RootStackParamList } from '../../types/ParamLists';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';

import { emailState } from '@recoil/recoil';

import { useEmailAuthentication } from '@hooks/api/member.mail';

const SchoolAuthenticationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useRecoilState<string>(emailState); // 이메일
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지

  const { mutateAsync: emailAuthentication } =
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="h-1 mt-[11px]">
            <ProgressBarComponent previousDealt={0} dealt={40} />
          </View>

          <View className="flex-1 mx-6">
            {/* 입력란 설명 */}
            <View className="flex mt-14">
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
                <Text className="text-error font-medium">{errorMessage}</Text>
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
