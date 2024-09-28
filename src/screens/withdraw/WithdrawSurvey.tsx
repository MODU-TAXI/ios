import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, TextInput } from 'react-native';

import ButtonComponent from '@components/Button';
import HeaderComponent from '@components/Header';

import { UserRecoil } from '@recoil/types/user';
import { userRecoilState } from '@recoil/states/user';

import { useIsOldiPhone } from '@hooks/device';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { WithdrawSurveyScreenProps } from '@type/param/loginStack';

const WithdrawSurveyScreen = ({ navigation }: WithdrawSurveyScreenProps) => {
  useDeleteAllNotifee();

  const userRecoil = useRecoilValue<UserRecoil>(userRecoilState);
  const isOldiPhone = useIsOldiPhone();

  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [otherReason, setOtherReason] = useState<string>('');

  const toWithdrawLastScreen = () => {
    navigation.navigate('WithdrawLastScreen');
  };

  const radioItems = [
    '택시를 잘 이용하지 않아요',
    '앱 사용 방법을 모르겠어요',
    '앱 오류가 많아요',
    '재가입이 필요해요',
    '기타',
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderComponent title="회원탈퇴" />

      <View className="mt-8 flex-1 px-6">
        <View>
          <Text className="text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            {userRecoil.nickname}님,
          </Text>

          <Text className="mt-1 text-[18px] font-semibold tracking-tight text-[#1F1F1F]">
            떠나시는 이유가 있으신가요?
          </Text>
        </View>

        <View className="mt-4">
          {radioItems.map((item, index) => (
            <Pressable
              key={index}
              className="mt-[18px] flex-row items-center"
              onPress={() => setSelectedItem(index)}
            >
              <View className="mr-2 h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] border-[#9C9C9C]">
                {selectedItem === index && (
                  <View className="h-[10px] w-[10px] rounded-full bg-[#5D5D5D]"></View>
                )}
              </View>
              <Text>{item}</Text>
            </Pressable>
          ))}

          {selectedItem === radioItems.length - 1 && (
            <TextInput
              className="mt-2 h-[130px] rounded bg-[#EEE] px-4 py-3"
              placeholder="이유를 입력해주세요"
              value={otherReason}
              multiline={true}
              onChangeText={setOtherReason}
            />
          )}
        </View>
      </View>

      <View className={`px-9 ${isOldiPhone && 'mb-4'}`}>
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={toWithdrawLastScreen}
        />
      </View>
    </SafeAreaView>
  );
};

export default WithdrawSurveyScreen;
