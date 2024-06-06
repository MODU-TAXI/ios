import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import SplitLine from '@assets/images/My/SplitLine.svg';
import NextButton from '@assets/images/My/NextButton.svg';
import ProfileImage from '@assets/images/My/ProfileImage.svg';
import LogoutButton from '@assets/images/My/LogoutButton.svg';
import ResignButton from '@assets/images/My/ResignButton.svg';
import ContactButton from '@assets/images/My/ContactButton.svg';

const MyPageScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4">
        <View className="py-3">
          <Text className="text-center text-[18px] font-semibold tracking-tight text-[#272727]">
            마이페이지
          </Text>
        </View>

        <View className="mt-9 flex items-center">
          <ProfileImage />
        </View>

        {/* 윗 부분 */}
        <View className="mt-8 rounded-xl border-[1px] border-[#EBEBEB] px-4">
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">닉네임</Text>

            <Text className="font-medium tracking-tight text-[#7C7C7C]">델로</Text>
          </View>
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">이름</Text>

            <Text className="font-medium tracking-tight text-[#7C7C7C]">오정현</Text>
          </View>
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">학교 인증</Text>

            <Text className="font-medium tracking-tight text-[#7C7C7C]">미인증</Text>
          </View>
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">비밀번호 변경</Text>
            <NextButton />
          </View>
          <View className="flex-row items-center justify-between py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">휴대폰 번호 변경</Text>

            <NextButton />
          </View>
        </View>

        {/* 아랫 부분 */}
        <View className="mt-4 rounded-xl border-[1px] border-[#EBEBEB] px-4">
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">이용내역</Text>

            <NextButton />
          </View>
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">알림설정</Text>

            <NextButton />
          </View>
          <View className="flex-row items-center justify-between border-b-[1px] border-b-[#D9D9D9] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">공지사항/이벤트</Text>

            <NextButton />
          </View>
          <View className="flex-row items-center justify-between py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">문의사항</Text>
            <NextButton />
          </View>
        </View>

        {/* 로그아웃, 회원탈퇴, 문의하기 */}
        <View className="mb-20 mt-8 flex-row items-center justify-between px-14">
          <View>
            <LogoutButton />
          </View>

          <SplitLine />

          <View>
            <ResignButton />
          </View>

          <SplitLine />

          <View>
            <ContactButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageScreen;
