import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import ProgressBarComponent from '@components/ProgressBar';
import { useSurvey } from '@hooks/api/onboarding';
import { RootStackParamList } from '@type/ParamLists';

type SurveyType = {
  index: number;
  content: string;
  select: boolean;
};

const ServeyFirstScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { mutateAsync } = useSurvey();

  const [surveyLists, setSurvetLists] = useState<SurveyType[]>([
    { index: 1, content: '에브리타임을 통해 알게 되었어요!', select: false },
    { index: 2, content: '지인 추천을 통해 알게 되었어요!', select: false },
    { index: 3, content: '직접 검색해서 통해 알게 되었어요!', select: false },
    { index: 4, content: '기타', select: false },
  ]);
  const [etcContent, setEtcContent] = useState<string>('');

  // 선택한 box 개수 계산
  const checkSelectedNum = useCallback((): number => {
    return surveyLists.filter((surveyList) => surveyList.select === true)
      .length;
  }, [surveyLists]);

  // 설문조사 제출
  const sendSurvey = async (): Promise<void> => {
    await mutateAsync({
      questionId: 1,
      answer1: surveyLists[0].select,
      answer2: surveyLists[1].select,
      answer3: surveyLists[2].select,
      etc: surveyLists[3].select,
      etcContent: etcContent,
    });
    navigation.navigate('SurveySecondScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* 진행사항 progressBar */}
      <View className="h-1 mt-[11px]">
        <ProgressBarComponent previousDealt={0} dealt={40} />
      </View>

      <View className="flex-1 mx-6">
        {/* 입력란 설명 */}
        <View className="flex mt-14">
          <Text className="text-xl font-bold">모두의 택시,</Text>
          <Text className="text-xl font-bold">어떻게 이용하게 되셨나요?</Text>
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
            disabled={!checkSelectedNum()}
            onPress={sendSurvey}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ServeyFirstScreen;
