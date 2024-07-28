import React from 'react';
import { useRecoilValue } from 'recoil';
import FastImage from 'react-native-fast-image';
import { Text, View, Modal, Pressable } from 'react-native';

import { userInfoState } from '@recoil/recoil';

import { useGetMemberInfo } from '@hooks/api/member';

import { UserPreview } from '@type/entity/user';

import Question from '@assets/images/Chat/Question.svg';
import Declaration from '@assets/images/Chat/Declaration.svg';
import SchoolBadge from '@assets/images/Chat/SchoolBadge.svg';

interface UserModalComponentProps {
  userInfo: UserPreview;
  modalVisible: boolean;
  closeUserInfoModal: () => void;
  toDeclarationScreen?: () => void;
}

const UserModalComponent: React.FC<UserModalComponentProps> = ({
  userInfo,
  modalVisible,
  closeUserInfoModal,
  toDeclarationScreen,
}) => {
  const myInfo = useRecoilValue(userInfoState);
  const { data: memberInfo, refetch } = useGetMemberInfo(userInfo.memberId);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        className="flex-1 flex-col justify-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <Pressable className="flex-1" onPress={closeUserInfoModal} />

        <View className="flex-col items-center justify-center rounded-t-[20px] bg-white pt-6">
          {/* 사진 */}
          <View className="mt-4">
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
            {memberInfo.certified && (
              <View className="mr-2 flex-row items-center">
                <SchoolBadge className="mr-1" />
                <Text className="text-gray700">학생인증 완료</Text>
              </View>
            )}

            <View className="flex-row items-center">
              <Question className="mr-1" />
              <Text className="mr-1 tracking-tight text-gray700">최근 매칭 횟수</Text>
              <Text className="font-medium text-gray700">{memberInfo.matchingCount}회</Text>
            </View>
          </View>

          {/* 신고하기 */}

          {myInfo.id !== userInfo.memberId ? (
            <Pressable className="mb-8 mt-4 p-4" onPress={toDeclarationScreen}>
              <Declaration />
            </Pressable>
          ) : (
            <View className="mb-8 mt-4 p-4" />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UserModalComponent;
