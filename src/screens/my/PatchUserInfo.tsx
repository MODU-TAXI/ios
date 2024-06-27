import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import InputBoxComponent from '@components/InputBox';
import RadioBoxComponent from '@components/RadioBox';
import PhoneNumberInputBoxComponent from '@components/PhoneNumberInputBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { userInfoState, signUpUserState } from '@recoil/recoil';

import { useSmsChangeAuthentication } from '@hooks/api/member.sms';

import { PatchUserInfoScreenProps } from '@type/param/loginStack';

const PatchUserInfoScreen = ({ navigation }: PatchUserInfoScreenProps) => {
  const [, setSignUpUser] = useRecoilState(signUpUserState); // 앞에서 받아온 회원가입 유저 정보
  const [userInfo] = useRecoilState(userInfoState);

  const [name, setName] = useState<string>(userInfo.name);
  const [gender, setGender] = useState<string>(userInfo.gender === 'MALE' ? '남자' : '여자');
  const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber);
  const [items, setItems] = useState([
    { index: 1, item: '남자', select: userInfo.gender === 'MALE' },
    { index: 2, item: '여자', select: userInfo.gender === 'FEMALE' },
  ]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const { mutateAsync: smsChangeAuthentication, isPending: smsChangeAuthenticationPending } =
    useSmsChangeAuthentication(setErrorMessage);

  useEffect(() => {
    const hasNameChanged = name !== userInfo.name;
    const hasGenderChanged =
      (userInfo.gender === 'MALE' && gender !== '남자') ||
      (userInfo.gender === 'FEMALE' && gender !== '여자');
    const hasPhoneNumberChanged = phoneNumber !== userInfo.phoneNumber;
    setIsButtonDisabled(!(hasNameChanged || hasGenderChanged || hasPhoneNumberChanged));
  }, [name, gender, phoneNumber, userInfo]);

  // 다음으로
  const toNext = async (): Promise<void> => {
    await smsChangeAuthentication({
      phoneNumber: phoneNumber,
    });

    setSignUpUser({
      key: '',
      name: name,
      gender: gender === '남자' ? 'MALE' : 'FEMALE',
      phoneNumber: phoneNumber,
    });
    navigation.navigate('PatchUserInfoAuthenticationScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {smsChangeAuthenticationPending && <TransparentLoadingComponent />}

      <HeaderComponent title="개인정보 수정" />

      {/* TouchableWithoutFeedback로 화면의 다른 부분 터치 시 키보드 내리기 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          <View className="mx-6 flex-1">
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
                color={'bg-main'}
                borderColor={'border-main'}
                textColor={'white'}
                text={'확인'}
                disabled={isButtonDisabled}
                onPress={toNext}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PatchUserInfoScreen;
