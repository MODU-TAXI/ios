import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/ParamLists';
import ButtonComponent from '@components/Button';

const CompleteSignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toNext = async (): Promise<void> => {
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6">
        {/* 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">가입완료!</Text>
          <Text className="text-xl font-bold">지금바로 탑승하러 가볼까요?</Text>
        </View>

        {/* 버튼을 아래로 내리기 위한 View */}
        <View className="flex-1"></View>

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

export default CompleteSignUpScreen;
