import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';

import { CompleteCalculateScreenProps } from '@type/param/loginStack';

const CompleteCalculateScreen = ({ navigation, route }: CompleteCalculateScreenProps) => {
  const { roomPreview } = route.params;

  const toChatScreen = () => {
    navigation.reset({
      index: 2,
      routes: [
        { name: 'MainScreen' },
        { name: 'RoomDetailScreen', params: { roomId: roomPreview.roomId } },
        { name: 'ChatRoomScreen', params: { roomId: roomPreview.roomId, readonly: false } },
      ],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 items-center justify-center">
        <Image source={require('../../assets/images/Common/Complete.gif')} />

        <Text className="mt-4 text-[20px] font-bold tracking-tight text-[#1F1F1F]">
          정산 내용 설정이 완료되었어요!
        </Text>

        <Text className="mt-2 tracking-tight text-[#5D5D5D]">참여멤버가 송금을 완료하면</Text>
        <Text className="tracking-tight text-[#5D5D5D]">푸시알림을 보내드릴게요!</Text>
      </View>

      <View className="mb-4 px-7">
        <ButtonComponent
          color={'bg-main'}
          borderColor={'border-main'}
          textColor={'white'}
          text={'확인'}
          disabled={false}
          onPress={toChatScreen}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompleteCalculateScreen;
