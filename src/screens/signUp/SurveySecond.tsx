import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import ProgressBarComponent from '@components/ProgressBar';
import { RootStackParamList } from '@type/ParamLists';

const ServeySecondScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [surveyLists, setSurvetLists] = useState([
    { index: 1, content: '지각할 것 같을때', select: false },
    { index: 2, content: '버스 줄이 너무 길때', select: false },
    { index: 3, content: '기타', select: false },
  ]);

  const toNext = async (): Promise<void> => {
    navigation.navigate('SchoolAuthenticationScreen');
  };

  // 선택한 box 개수 계산
  const checkSelectedNum = () => {
    return surveyLists.filter((surveyList) => surveyList.select === true)
      .length;
  };

  // 하나라도 선택되었을때 버튼 활성화
  useEffect(() => {
    if (checkSelectedNum() > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [surveyLists]);

  return (
    <SafeAreaView className="flex-1">
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt="w-2/5" dealt="w-3/5" />
      </View>

      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">택시를 가장 타고싶었던</Text>
          <Text className="text-xl font-bold">순간이 있으신가요?</Text>
        </View>

        {/* 선택 BOX */}
        <View className="flex-1 mt-6">
          <SelectBoxComponent items={surveyLists} setItems={setSurvetLists} />
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

export default ServeySecondScreen;
