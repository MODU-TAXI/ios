import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import ProgressBarComponent from '@components/ProgressBar';
import { RootStackParamList } from '@type/ParamLists';

const CompleteSignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toNext = async (): Promise<void> => {
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt="w-4/5" dealt="w-full" />
      </View>

      <View className="flex-1 mx-6">
        {/* 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">가입완료!</Text>
          <Text className="text-xl font-bold">지금바로 탑승하러 가볼까요?</Text>
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
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteSignUpScreen;
