import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import RadioBoxComponent from '@components/RadioBox';
import ProgressBarComponent from '@components/ProgressBar';
import PhoneNumberInputBoxComponent from '@components/PhoneNumberInputBox';

import { SignUpUser } from '@recoil/type';
import { signUpUserState } from '@recoil/recoil';

import { useSmsAuthentication } from '@hooks/api/member.sms';

import { AuthenticationScreenProps } from '@type/param/rootStack';

// 이름, 성별, 전화번호 입력 스크린
const AuthenticationScreen = ({ navigation }: AuthenticationScreenProps) => {
  const [signUpUser, setSignUpUser] = useRecoilState<SignUpUser>(signUpUserState);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [items, setItems] = useState([
    { index: 1, item: '남자', select: false },
    { index: 2, item: '여자', select: false },
  ]);

  const { mutateAsync: smsAuthentication } = useSmsAuthentication(setErrorMessage);

  // 다음으로
  const toNext = async (): Promise<void> => {
    setSignUpUser((prevState: SignUpUser) => ({
      ...prevState,
      name: name,
      gender: gender === '남자' ? 'MALE' : 'FEMALE',
      phoneNumber: phoneNumber,
    }));

    await smsAuthentication({
      key: signUpUser.key,
      phoneNumber: phoneNumber,
    });

    navigation.navigate('PhoneAuthenticationCodeScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* TouchableWithoutFeedback로 화면의 다른 부분 터치 시 키보드 내리기 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* 진행사항 progressBar */}
          <View className="mt-[11px] h-1">
            <ProgressBarComponent previousDealt={0} dealt={20} />
          </View>

          <View className="mx-6 flex-1">
            {/* 입력란 설명 */}
            <View className="mt-14 flex">
              <Text className="text-xl font-bold">모두의 택시에서</Text>
              <Text className="text-xl font-bold">사용할 닉네임을 입력해주세요!</Text>
            </View>

            {/* 이름 입력란 */}
            <View className="mt-6">
              <InputBoxComponent
                title="이름"
                value={name}
                setValue={setName}
                placeholder="김모두"
              />
            </View>

            {/* 성별 선택란 */}
            <View className="mt-4">
              <RadioBoxComponent
                title="성별"
                value={gender}
                setValue={setGender}
                items={items}
                setItems={setItems}
              />
            </View>

            {/* 전화번호 */}
            <View className="mt-4">
              <PhoneNumberInputBoxComponent
                title="전화번호"
                value={phoneNumber}
                setValue={setPhoneNumber}
                placeholder="010-XXXX-XXXX"
              />
            </View>

            {/* 경고 메세지 */}
            <View className="mt-2 flex-row justify-between px-2">
              <Text className="font-medium text-error">{errorMessage}</Text>
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
                disabled={!name || !gender || !phoneNumber}
                onPress={toNext}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AuthenticationScreen;
