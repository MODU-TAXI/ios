import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import ProgressBarComponent from '@components/ProgressBar';
import { RootStackParamList } from '@type/ParamLists';

type SurveyType = {
  index: number;
  content: string;
  select: boolean;
};

const ServeySecondScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [surveyLists, setSurvetLists] = useState<SurveyType[]>([
    { index: 1, content: '지각할 것 같을때', select: false },
    { index: 2, content: '버스 줄이 너무 길때', select: false },
    { index: 3, content: '기타', select: false },
  ]);

  // 선택한 box 개수 계산
  const checkSelectedNum = useCallback((): number => {
    return surveyLists.filter((surveyList) => surveyList.select === true)
      .length;
  }, [surveyLists]);

  // 하나라도 선택되었을때 버튼 활성화
  useEffect(() => {
    if (checkSelectedNum() > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [surveyLists, checkSelectedNum]);

  const toNext = async (): Promise<void> => {
    navigation.navigate('CompleteSignUpScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt={20} dealt={60} />
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
            borderColor={'border-black'}
            textColor={'white'}
            text={'확인'}
            disabled={buttonDisabled}
            onPress={toNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ServeySecondScreen;
