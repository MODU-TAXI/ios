import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/ParamLists';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';

const SchoolAuthenticationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState<string>('');

  const toNext = async (): Promise<void> => {
    navigation.navigate('AuthenticationCodeScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">학교 인증을 하면</Text>
          <Text className="text-xl font-bold">매칭률이 72% 이상 올라가요!</Text>
        </View>

        {/* Input 컴포넌트 */}
        <InputBoxComponent
          title="학교 이메일"
          value={email}
          setValue={setEmail}
          placeholder="moduteam@inha.edu"
        />

        {/* 경고 메세지 */}
        <View>
          <Text className="text-rose-600">잘못된 이메일 형식입니다!</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 다음에 하기 버튼 */}
        <ButtonComponent
          color={'bg-disable'}
          text={'다음에 할래요'}
          textColor={'white'}
          onPress={toNext}
        />

        {/* 확인 버튼 */}
        <ButtonComponent
          color={'bg-black'}
          text={'확인'}
          textColor={'white'}
          onPress={toNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default SchoolAuthenticationScreen;
