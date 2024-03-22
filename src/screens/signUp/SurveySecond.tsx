import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import { RootStackParamList } from '@type/ParamLists';

const ServeySecondScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toNext = async (): Promise<void> => {
    navigation.navigate('SchoolAuthenticationScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">택시를 가장 타고싶었던</Text>
          <Text className="text-xl font-bold">순간이 있으신가요?</Text>
        </View>

        {/* 선택 BOX */}
        <View className="flex-1 pt-2">
          <SelectBoxComponent content="지각할 것 같을때" />

          <SelectBoxComponent content="버스 줄이 너무 길때" />

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

export default ServeySecondScreen;
