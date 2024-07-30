import { Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import ProgressBarComponent from '@components/ProgressBar';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useSurvey } from '@hooks/api/onboarding';

import { SurveySecondScreenProps } from '@type/param/rootStack';

type SurveyType = {
  index: number;
  content: string;
  select: boolean;
};

const ServeySecondScreen = ({ navigation }: SurveySecondScreenProps) => {
  const [surveyLists, setSurvetLists] = useState<SurveyType[]>([
    { index: 1, content: '지각할 것 같을때', select: false },
    { index: 2, content: '버스 줄이 너무 길때', select: false },
    { index: 3, content: '기타', select: false },
  ]);
  const [etcContent] = useState<string>('');

  // 선택한 box 개수 계산
  const checkSelectedNum = useCallback((): number => {
    return surveyLists.filter((surveyList) => surveyList.select === true).length;
  }, [surveyLists]);

  const { mutateAsync: survey, isPending: surveyPending } = useSurvey();

  // 설문조사 제출
  const sendSurvey = async (): Promise<void> => {
    await survey({
      questionId: 1,
      answer1: surveyLists[0].select,
      answer2: surveyLists[1].select,
      etc: surveyLists[2].select,
      etcContent: etcContent,
    });
    navigation.navigate('CompleteSignUpScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {surveyPending && <TransparentLoadingComponent />}

      {/* 진행사항 progressBar */}
      <View className="mt-[11px] h-1">
        <ProgressBarComponent previousDealt={0} dealt={100} />
      </View>

      <View className="mx-6 flex-1">
        {/* 입력란 설명 */}
        <View className="mt-14 flex">
          <Text className="text-xl font-bold">택시를 가장 타고싶었던</Text>
          <Text className="text-xl font-bold">순간이 있으신가요?</Text>
        </View>

        {/* 선택 BOX */}
        <View className="mt-6 flex-1">
          <SelectBoxComponent items={surveyLists} setItems={setSurvetLists} />
        </View>

        {/* 확인 버튼 */}
        <View className="mx-3 mb-10">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
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

export default ServeySecondScreen;
