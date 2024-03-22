import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import { RootStackParamList } from '@type/ParamLists';
import ProgressBarComponent from '@components/ProgressBar';

const ServeyFirstScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toNext = async (): Promise<void> => {
    navigation.navigate('SurveySecondScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt="w-1/5" dealt="w-2/5" />
      </View>
      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">모두의 택시,</Text>
          <Text className="text-xl font-bold">어떻게 이용하게 되셨나요?</Text>
        </View>

        {/* 선택 BOX */}
        <View className="flex-1 pt-2">
          <SelectBoxComponent content="에브리타임을 통해 알게 되었어요!" />

          <SelectBoxComponent content="지인 추천을 통해 알게 되었어요!" />

          <SelectBoxComponent content="직접 검색해서 통해 알게 되었어요!" />

          <SelectBoxComponent content="기타" />
        </View>

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

export default ServeyFirstScreen;
