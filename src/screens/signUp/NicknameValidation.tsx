import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/ParamLists';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';

const NicknameValidationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [nickname, setNickname] = useState<string>('');

  const toNext = async (): Promise<void> => {
    navigation.navigate('SurveyFirstScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-12">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">모두의 택시에서</Text>
          <Text className="text-xl font-bold">
            사용할 닉네임을 입력해주세요!
          </Text>
        </View>

        {/* Input 컴포넌트 */}
        <InputBoxComponent
          title="닉네임"
          value={nickname}
          setValue={setNickname}
          placeholder="두 글자 이상"
        />

        {/* 경고 메세지 */}
        <View>
          <Text className="text-rose-600">이미 존재하는 닉네임이에요!</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

        {/* 확인 버튼 */}
        <ButtonComponent
          color={'black'}
          text={'확인'}
          textColor={'white'}
          onPress={toNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default NicknameValidationScreen;
