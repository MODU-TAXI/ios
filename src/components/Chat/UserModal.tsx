import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View, Modal, Pressable } from 'react-native';

import { UserPreview } from '@type/entity/user';

import Question from '@assets/images/Chat/Question.svg';
import UserImage from '@assets/images/Chat/UserImage.svg';
import Declaration from '@assets/images/Chat/Declaration.svg';
import SchoolBadge from '@assets/images/Chat/SchoolBadge.svg';

interface UserModalComponentProps {
  userInfo: UserPreview;
  modalVisible: boolean;
  closeUserInfoModal: () => void;
  toDeclarationScreen: () => void;
}

const UserModalComponent: React.FC<UserModalComponentProps> = ({
  userInfo,
  modalVisible,
  closeUserInfoModal,
  toDeclarationScreen,
}) => {
  console.log('imageUrl:', userInfo.imageUrl);
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        className="flex-1 flex-col justify-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <Pressable className="flex-1" onPress={closeUserInfoModal} />

        <View className="flex-col items-center justify-center rounded-t-[20px] bg-white pt-[50px]">
          {/* 사진 */}
          <View className="mt-10">
            <FastImage
              source={{ uri: userInfo.imageUrl }}
              className="h-[160px] w-[160px] rounded-full"
            />
          </View>

          {/* 이름 */}
          <View className="my-4">
            <Text className="text-[18px] font-semibold tracking-tight text-[#272727]">
              {userInfo.nickname}
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="mr-2 flex-row items-center">
              <SchoolBadge className="mr-1" />
              <Text>학생인증</Text>
            </View>

            <View className="flex-row items-center">
              <Question className="mr-1" />
              <Text className="mr-1 tracking-tight text-[#272727]">최근 매칭 확률</Text>
              <Text className="font-medium text-[#5d5d5d]">80%</Text>
            </View>
          </View>

          {/* 신고하기 */}
          <Pressable className="mb-8 mt-4 p-4" onPress={toDeclarationScreen}>
            <Declaration />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default UserModalComponent;
