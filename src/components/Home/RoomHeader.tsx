import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '@assets/images/Header/BackButton.svg';
import CloseButton from '@assets/images/Header/CloseButton.svg';

interface RoomHeaderComponentProps {
  openUpdateModal: () => void;
  myRoom: boolean;
}

const RoomHeaderComponent: React.FC<RoomHeaderComponentProps> = ({ openUpdateModal, myRoom }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-row items-center justify-between bg-white px-4">
      <Pressable onPress={goBack}>
        <BackButton />
      </Pressable>
      <Text className="text-lg font-semibold text-black">매칭 페이지</Text>i
      {/* 방장인 경우에만 수정/삭제 버튼 visible */}
      {myRoom && (
        <Pressable onPress={openUpdateModal}>
          <CloseButton />
        </Pressable>
      )}
    </View>
  );
};

export default RoomHeaderComponent;
