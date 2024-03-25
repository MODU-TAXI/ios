import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import RadioBoxComponent from '@components/RadioBox';
import ProgressBarComponent from '@components/ProgressBar';
import { RootStackParamList } from '@type/ParamLists';

// 이름, 성별, 전화번호 입력 스크린
const AuthenticationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [items, setItems] = useState([
    { index: 1, item: '남자', select: false },
    { index: 2, item: '여자', select: false },
  ]);

  // 모두 입력되었을때 버튼 활성화
  useEffect(() => {
    if (name && gender && phoneNumber) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, gender, phoneNumber]);

  const toNext = async (): Promise<void> => {
    navigation.navigate('PhoneAuthenticationCodeScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt={0} dealt={20} />
      </View>
      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">모두의 택시에서</Text>
          <Text className="text-xl font-bold">
            사용할 닉네임을 입력해주세요!
          </Text>
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
          <InputBoxComponent
            title="전화번호"
            value={phoneNumber}
            setValue={setPhoneNumber}
            placeholder="010-XXXX-XXXX"
          />
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 확인 버튼 */}
        <View className="mx-3 mb-11">
          <ButtonComponent
            color={'bg-black'}
            text={'확인'}
            textColor={'white'}
            onPress={toNext}
            disabled={buttonDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthenticationScreen;
