import React, { useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';
import InquiryInputBoxComponent from '@components/My/InquiryInputBox';
import InquirySelectBoxComponent from '@components/My/InquirySelectBox';

import { InquiryScreenProps } from '@type/param/loginStack';

import DeclarationAlert from '@assets/images/Declaration/DeclarationAlert.svg';

const InquiryScreen = ({ navigation }: InquiryScreenProps) => {
  const [inquiryType, setInquiryType] = useState<string>(''); // 신구 유형
  const [inquiryContent, setInquiryContent] = useState<string>(''); // 신고 내용

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title={'문의하기'} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView className="flex-1">
          <View className="px-7">
            {/* 문의 유형 */}
            <View className="mt-10">
              <Text className="text-[14px] font-semibold tracking-tight text-[#5D5D5D]">
                문의 유형
              </Text>

              <InquirySelectBoxComponent setInquiryType={setInquiryType} />
            </View>

            {/* 문의 내용 */}
            <View className="mt-10">
              <Text className="text-[14px] font-semibold tracking-tight text-[#5D5D5D]">
                문의 내용
              </Text>
              <InquiryInputBoxComponent
                inquiryContent={inquiryContent}
                setInquiryContent={setInquiryContent}
              />
            </View>

            {/* 안내 문구 */}
            <View className="mt-3 flex-row items-center">
              <DeclarationAlert className="mr-1" />

              <Text className="text-[12px]  tracking-tight text-[#AFAFAF]">
                문의 접수 후 패널티 조치까지 3-5일정도 소요될 수 있어요!
              </Text>
            </View>
          </View>

          <View className="flex-1" />

          <View className="mx-7">
            <ButtonComponent
              color={'bg-main'}
              borderColor={'border-main'}
              textColor={'white'}
              text={'문의하기'}
              disabled={!inquiryType || !inquiryContent}
              onPress={() => {
                console.log('?');
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default InquiryScreen;
