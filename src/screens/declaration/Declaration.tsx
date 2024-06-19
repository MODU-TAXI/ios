import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/Declaration/InputBox';
import SelectBoxComponent from '@components/Declaration/SelectBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { useReport } from '@hooks/api/report';

import { InfoToastMessage } from '@utils/toastMessage';

import { DeclarationScreenProps } from '@type/param/loginStack';

import DeclarationBell from '@assets/images/Declaration/DeclarationBell.svg';
import DeclarationAlert from '@assets/images/Declaration/DeclarationAlert.svg';

const DeclarationScreen = ({ navigation, route }: DeclarationScreenProps) => {
  const { userInfo, roomId } = route.params;

  const [declareType, setDeclareType] = useState<string>(''); // 신구 유형
  const [declareContent, setDeclareContent] = useState<string>(''); // 신고 내용

  const { mutateAsync: reportMutation, isPending: reportPending } = useReport();

  // 신고하기
  const delcareUser = async () => {
    if (declareContent.trim().length < 10) {
      return Alert.alert('신고를 10글자 이상 입력해주세요!');
    }

    await reportMutation({
      roomId: roomId,
      targetId: userInfo.memberId,
      type: declareType,
      content: declareContent,
    });
    InfoToastMessage('신고가 접수되었습니다.');

    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 신고 시 로딩 */}
      {reportPending && <TransparentLoadingComponent />}

      <HeaderComponent title={'신고'} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView>
          <View className="px-7">
            <View className="flx-col mt-8 items-center justify-center">
              <DeclarationBell />

              <View className="flex-row items-center">
                <Text className="text-[16px] font-semibold tracking-tight text-[#3E3E3E]">
                  {userInfo.nickname}
                </Text>
                <Text className="text-[16px] font-semibold tracking-tight text-[#7C7C7C]">
                  님을 신고합니다
                </Text>
              </View>
            </View>

            {/* 신고 유형 */}
            <View className="mt-10">
              <Text className="text-[14px] font-semibold tracking-tight text-[#5D5D5D]">
                신고 유형
              </Text>

              <SelectBoxComponent setDeclareType={setDeclareType} />
            </View>

            {/* 신고 내용 */}
            <View className="mt-10">
              <Text className="text-[14px] font-semibold tracking-tight text-[#5D5D5D]">
                신고 내용
              </Text>
              <InputBoxComponent
                declareContent={declareContent}
                setDeclareContent={setDeclareContent}
              />
            </View>

            {/* 안내 문구 */}
            <View className="mt-3 flex-row items-center">
              <DeclarationAlert className="mr-1" />

              <Text className="text-[12px]  tracking-tight text-[#AFAFAF]">
                신고 접수 후 패널티 조치까지 3-5일정도 소요될 수 있어요!
              </Text>
            </View>
          </View>

          <View className="mx-7 mb-10 mt-[78px]">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'신고하기'}
              disabled={!declareType || !declareContent}
              onPress={delcareUser}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default DeclarationScreen;
