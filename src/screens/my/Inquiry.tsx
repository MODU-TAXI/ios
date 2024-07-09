import React from 'react';
import { Text, View, Alert, Linking, SafeAreaView } from 'react-native';

import HeaderComponent from '@components/Header';

import { useDeleteAllNotifee } from '@hooks/notifee';

import { InquiryScreenProps } from '@type/param/loginStack';

import InquiryKakao from '@assets/images/My/InquiryKakao.svg';

const InquiryScreen = ({ navigation }: InquiryScreenProps) => {
  useDeleteAllNotifee();

  const inquiryKakao = async () => {
    // URL을 열 수 있는지 확인
    const canOpen = await Linking.canOpenURL('https://open.kakao.com/o/sIHBVkzg');

    if (canOpen) {
      // URL 열기
      Linking.openURL('https://open.kakao.com/o/sIHBVkzg');
    } else {
      Alert.alert('에러', '카카오톡을 오픈하는데 실패하였습니다.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title={'문의하기'} />

      <View className="ml-7 mt-10">
        <Text className="text-[24px] font-semibold tracking-tight text-[#1F1F1F]">
          문의는 카카오 채널로
        </Text>
        <Text className="text-[24px] font-semibold tracking-tight text-[#1F1F1F]">남겨주세요.</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <InquiryKakao onPress={inquiryKakao} />

        <View className="mt-11">
          <Text className="text-[12px] tracking-tight text-[#5D5D5D]">
            누르면 해당 문의 채널로 연결됩니다
          </Text>
        </View>
      </View>

      <View className="mb-8 items-center">
        <Text className="text-[12px] font-medium tracking-tight text-[#9C9C9C]">
          모두의 택시는 택시팟 중계 서비스입니다.
        </Text>
        <Text className="text-[12px] font-medium tracking-tight text-[#9C9C9C]">
          앞으로 택시 업계와 협업하여
        </Text>
        <Text className="text-[12px] font-medium tracking-tight text-[#9C9C9C]">
          합리적인 가격으로 서비스를 이용하실 수 있도록 노력하겠습니다.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default InquiryScreen;
