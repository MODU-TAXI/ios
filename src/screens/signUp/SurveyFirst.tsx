import { Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';
import SelectBoxComponent from '@components/SelectBox';
import ProgressBarComponent from '@components/ProgressBar';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useSurvey } from '@hooks/api/onboarding';

import { SurveyFirstScreenProps } from '@type/param/rootStack';

type SurveyType = {
  index: number;
  content: string;
  select: boolean;
};

const ServeyFirstScreen = ({ navigation }: SurveyFirstScreenProps) => {
  const [surveyLists, setSurvetLists] = useState<SurveyType[]>([
    { index: 1, content: '에브리타임을 통해 알게 되었어요!', select: false },
    { index: 2, content: '지인 추천을 통해 알게 되었어요!', select: false },
    { index: 3, content: '직접 검색해서 통해 알게 되었어요!', select: false },
    { index: 4, content: '기타', select: false },
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
      answer3: surveyLists[2].select,
      etc: surveyLists[3].select,
      etcContent: etcContent,
    });
    navigation.navigate('SurveySecondScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {surveyPending && <TransparentLoadingComponent />}

      {/* 진행사항 progressBar */}
      <View className="mt-[11px] h-1">
        <ProgressBarComponent previousDealt={0} dealt={60} />
      </View>

      <View className="mx-6 flex-1">
        {/* 입력란 설명 */}
        <View className="mt-14 flex">
          <Text className="text-xl font-bold">모두의 택시,</Text>
          <Text className="text-xl font-bold">어떻게 이용하게 되셨나요?</Text>
        </View>

        {/* 선택 BOX */}
        <View className="mt-6 flex-1">
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
