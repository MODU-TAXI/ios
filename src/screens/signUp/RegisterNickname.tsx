import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';

import { userInfoState } from '@recoil/recoil';

import { useRegisterNickname } from '@hooks/api/member';

import { RegisterNicknameScreenProps } from '@type/param/rootStack';

const RegisterNicknameScreen = ({ navigation }: RegisterNicknameScreenProps) => {
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { mutateAsync: registerNickname } = useRegisterNickname(setErrorMessage);

  // 닉네임 유효성 체크
  const checkNickname = async (): Promise<void> => {
    if (nickname.trim() === '') {
      return setErrorMessage('닉네임은 공백일 수 없습니다.');
    }

    const trimNickname = nickname.trim();

    await registerNickname({ nickname: trimNickname });

    setUserInfo({
      id: userInfo.id,
      name: userInfo.name,
      nickname: trimNickname,
      gender: userInfo.gender,
      phoneNumber: userInfo.phoneNumber,
      email: userInfo.email,
      imageUrl: userInfo.imageUrl,
    });

    navigation.navigate('SchoolAuthenticationScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="mt-[11px] h-1">
            <ProgressBarComponent previousDealt={0} dealt={40} />
          </View>

          <View className="mx-6 flex-1">
            {/* 입력란 설명 */}
            <View className="mt-14 flex-col">
              <Text className="text-xl font-bold">모두의 택시 이용을 위해</Text>
              <Text className="text-xl font-bold">닉네임을 설정해주세요!</Text>
            </View>

            {/* Input 컴포넌트 */}
            <View className="mt-6">
              <InputBoxComponent
                title="닉네임"
                value={nickname}
                setValue={setNickname}
                placeholder="한글,영문 2~12자"
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
                color={'bg-black'}
                borderColor={'border-black'}
                textColor={'white'}
                text={'확인'}
                disabled={!nickname}
                onPress={checkNickname}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterNicknameScreen;
