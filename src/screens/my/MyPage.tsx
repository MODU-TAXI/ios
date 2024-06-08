import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoadingComponent from '@components/Common/Loading';
import SelectImageModal from '@components/Common/SelectImageModal';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { userInfoState } from '@recoil/recoil';

import { usePatchMember } from '@hooks/api/member';

import { openAlbum, openCamera } from '@utils/image';

import Camera from '@assets/images/My/Camera.svg';
import SplitLine from '@assets/images/My/SplitLine.svg';
import NextButton from '@assets/images/My/NextButton.svg';
import LogoutButton from '@assets/images/My/LogoutButton.svg';
import ResignButton from '@assets/images/My/ResignButton.svg';
import ContactButton from '@assets/images/My/ContactButton.svg';

const MyPageScreen = () => {
  const userInfo = useRecoilValue(userInfoState);

  const { mutateAsync: patchMemberMutate, isPending: patchMemberPending } = usePatchMember();
  const [profileImage, setProfileImage] = useState<string>(userInfo.imageUrl);
  const [selectImageModalVisible, setSelectImageModalVisible] = useState<boolean>(false); // 이미지 보내기 모달 뷰

  // 로그아웃
  const logOut = () => {
    console.log('logout!');
  };

  // 이미지 선택 모달 띄우기
  const openSelectImageModal = () => {
    setSelectImageModalVisible(true);
  };

  // 이미지 선택 모달 내리기
  const closeSelectImageModal = () => {
    setSelectImageModalVisible(false);
  };

  // 카메라로 이미지 고르기
  const selectImageFromCamera = async (): Promise<void> => {
    closeSelectImageModal();

    const imageUrl = await openCamera();

    if (imageUrl) {
      patchMemberMutate({
        name: userInfo.name,
        gender: userInfo.gender,
        phoneNumber: userInfo.phoneNumber,
        imageUrl: imageUrl,
      });
      setProfileImage(imageUrl);
    }
  };

  // 앨범에서 이미지 고르기
  const selectImageFromAlbum = async (): Promise<void> => {
    closeSelectImageModal();

    const imageUrl = await openAlbum();

    if (imageUrl) {
      if (imageUrl) {
        patchMemberMutate({
          name: userInfo.name,
          gender: userInfo.gender,
          phoneNumber: userInfo.phoneNumber,
          imageUrl: imageUrl,
        });
        setProfileImage(imageUrl);
      }
    }
  };

  if (!userInfo) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {patchMemberPending && <TransparentLoadingComponent />}

      <ScrollView className="px-4">
        <View className="py-3">
          <Text className="text-center text-[18px] font-semibold tracking-tight text-[#272727]">
            마이페이지
          </Text>
        </View>

        <View className="mt-9 flex items-center">
          <Pressable className="h-[120px] w-[120px] rounded-full" onPress={openSelectImageModal}>
            <FastImage
              source={{ uri: profileImage }}
              className="h-[120px] w-[120px] rounded-full"
            />

            <View className="absolute bottom-0 right-0 z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white">
              <Camera />
            </View>
          </Pressable>
        </View>

        {/* 윗 부분 */}
        <View className="mt-8 rounded-xl border-[1px] border-[#EBEBEB] px-4">
          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">닉네임</Text>
            <Text className="font-medium tracking-tight text-[#7C7C7C]">{userInfo.nickname}</Text>
          </Pressable>

          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">이름</Text>
            <Text className="font-medium tracking-tight text-[#7C7C7C]">{userInfo.name}</Text>
          </Pressable>

          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">학교 인증</Text>
            <Text className="font-medium tracking-tight text-[#7C7C7C]">
              {userInfo.email ? '인증' : '미인증'}
            </Text>
          </Pressable>

          <Pressable className="flex-row items-center justify-between py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">휴대폰 번호 변경</Text>
            <NextButton />
          </Pressable>
        </View>

        {/* 아랫 부분 */}
        <View className="mt-4 rounded-xl border-[1px] border-[#EBEBEB] px-4">
          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">이용내역</Text>
            <NextButton />
          </Pressable>

          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">알림설정</Text>
            <NextButton />
          </Pressable>

          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">공지사항/이벤트</Text>
            <NextButton />
          </Pressable>

          <Pressable className="flex-row items-center justify-between py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">문의사항</Text>
            <NextButton />
          </Pressable>
        </View>

        {/* 로그아웃, 회원탈퇴, 문의하기 */}
        <View className="mb-20 mt-8 flex-row items-center justify-between px-14">
          <Pressable onPress={logOut} className="p-4">
            <LogoutButton />
          </Pressable>

          <SplitLine />

          <Pressable className="p-4">
            <ResignButton />
          </Pressable>

          <SplitLine />

          <Pressable className="p-4">
            <ContactButton />
          </Pressable>
        </View>
      </ScrollView>

      <SelectImageModal
        modalVisible={selectImageModalVisible}
        closeSelectImageModal={closeSelectImageModal}
        selectImageFromCamera={selectImageFromCamera}
        selectImageFromAlbum={selectImageFromAlbum}
      />
    </SafeAreaView>
  );
};

export default MyPageScreen;
