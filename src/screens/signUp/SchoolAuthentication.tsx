import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../type/ParamLists';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import ProgressBarComponent from '@components/ProgressBar';

const SchoolAuthenticationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const toEnd = async (): Promise<void> => {
    navigation.navigate('CompleteSignUpScreen');
  };

  const toNext = async (): Promise<void> => {
    navigation.navigate('EmailAuthenticationCodeScreen');
  };

  // 입력 되었을때 버튼 활성화
  useEffect(() => {
    if (!email) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [email]);

  return (
    <SafeAreaView className="flex-1">
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt="w-4/5" dealt="w-4/5" />
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
        <View className="mt-2 px-2">
          <Text className="text-error font-medium">
            올바르지 않은 이메일이에요!
          </Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 다음에 하기 버튼 */}
        <View className="mx-3 mb-3">
          <ButtonComponent
            color={'bg-disabled'}
            text={'다음에 할래요'}
            textColor={'white'}
            onPress={toEnd}
            disabled={false}
          />
        </View>

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

export default SchoolAuthenticationScreen;
