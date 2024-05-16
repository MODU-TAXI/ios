import React from 'react';
import { Text, View, Modal, Pressable } from 'react-native';

import Question from '@assets/images/Chat/Question.svg';
import UserImage from '@assets/images/Chat/UserImage.svg';
import Declaration from '@assets/images/Chat/Declaration.svg';
import SchoolBadge from '@assets/images/Chat/SchoolBadge.svg';

interface UserModalComponentProps {
  modalVisible: boolean;
  closeUserInfoModal: () => void;
}

const UserModalComponent: React.FC<UserModalComponentProps> = ({
  modalVisible,
  closeUserInfoModal,
}) => {
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
            <UserImage />
          </View>

          {/* 이름 */}
          <View className="my-4">
            <Text className="text-[18px] font-semibold">헤일/이하연</Text>
          </View>

          <View className="flex-row items-center">
            <View className="mr-2 flex-row items-center">
              <SchoolBadge className="mr-1" />
              <Text>학생인증</Text>
            </View>

            <View className="flex-row items-center">
              <Question className="mr-1" />
              <Text className="mr-1">최근 매칭 확률</Text>
              <Text className="font-medium text-[#5d5d5d]">80%</Text>
            </View>
          </View>

          {/* 신고하기 */}
          <View className="mb-8 mt-4 p-4">
            <Declaration />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserModalComponent;
