import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoadingComponent from '@components/Common/Loading';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';
import ImageUploadtLoadingComponent from '@components/Common/ImageUploadLoading';

import { loggedInState, userInfoState } from '@recoil/recoil';

import { usePatchMember } from '@hooks/api/member';
import { useDeleteAllNotifee } from '@hooks/notifee';

import { deleteToken } from '@utils/token';
import { openAlbum, openCamera } from '@utils/image';

import { MyPageScreenProps } from '@type/param/loginStack';

import Camera from '@assets/images/My/Camera.svg';
import SplitLine from '@assets/images/My/SplitLine.svg';
import NextButton from '@assets/images/My/NextButton.svg';
import LogoutButton from '@assets/images/My/LogoutButton.svg';
import ResignButton from '@assets/images/My/ResignButton.svg';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  useDeleteAllNotifee();

  const userInfo = useRecoilValue(userInfoState);

  const { mutateAsync: patchMemberMutate, isPending: patchMemberPending } = usePatchMember();
  const [profileImage, setProfileImage] = useState<string>(userInfo.imageUrl);

  const [imageUploageLoading, setImageUploadLoading] = useState<boolean>(false);
  const [, setLoggedIn] = useRecoilState(loggedInState);

  // 로그아웃
  const logOut = () => {
    Alert.alert('정말 로그아웃 하시겠어요?', '모두의택시 이용 기록은 여전히 남아있어요', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        onPress: async () => {
          await deleteToken();
          setLoggedIn(false);
        },
      },
    ]);
  };

  // 이미지 선택 모달 띄우기
  const openSelectImageModal = () => {
    Alert.alert(
      '프로필 사진 수정',
      '',
      [
        {
          text: '앨범에서 선택',
          onPress: selectImageFromAlbum,
        },
        { text: '카메라로 찍기', onPress: selectImageFromCamera },
        { text: '취소' },
      ],
      { cancelable: false },
    );
  };

  // 카메라로 이미지 고르기
  const selectImageFromCamera = async (): Promise<void> => {
    setImageUploadLoading(true);

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

    setImageUploadLoading(false);
  };

  // 앨범에서 이미지 고르기
  const selectImageFromAlbum = async (): Promise<void> => {
    setImageUploadLoading(true);

    const imageUrl = await openAlbum();

    if (imageUrl) {
      patchMemberMutate({
        name: userInfo.name,
        gender: userInfo.gender,
        phoneNumber: userInfo.phoneNumber,
        imageUrl: imageUrl,
      });

      setProfileImage(imageUrl);
    }

    setImageUploadLoading(false);
  };

  // 닉네임 수정 페이지 이동
  const toPatchNicknameScreen = () => {
    navigation.navigate('PatchNicknameScreen');
  };

  // 개인정보 수정 페이지 이동
  const toPatchUserInfoScreen = () => {
    navigation.navigate('PatchUserInfoScreen');
  };

  // 학교인증 수정 페이지 이동
  const toPatchSchoolEmailScreen = () => {
    navigation.navigate('PatchSchoolEmailScreen');
  };

  // 이용 내용 페이지 이동
  const toHistoryScreen = () => {
    navigation.navigate('HistoryScreen');
  };

  // 계좌 관리 페이지 이동
  const toManageAccountScreen = () => {
    navigation.navigate('ManageAccountScreen');
  };

  // 문의하기 페이지 이동
  const toInquiryScreen = () => {
    navigation.navigate('InquiryScreen');
  };

  // 회원탈퇴 페이지 이동
  const toWithdarwScreen = () => {
    navigation.navigate('WithdrawCheckScreen');
  };

  if (!userInfo) return <LoadingComponent />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {patchMemberPending && <TransparentLoadingComponent />}

      {imageUploageLoading && <ImageUploadtLoadingComponent />}

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
          <Pressable
            className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4"
            onPress={toPatchNicknameScreen}
          >
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">닉네임</Text>
            <Text className="font-medium tracking-tight text-[#7C7C7C]">{userInfo.nickname}</Text>
          </Pressable>

          {/* 
          <Pressable className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4">
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">이름</Text>
            <Text className="font-medium tracking-tight text-[#7C7C7C]">{userInfo.name}</Text>
          </Pressable> */}

          <Pressable
            className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4"
            onPress={toPatchSchoolEmailScreen}
          >
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">학교 인증</Text>
            <Text className="font-medium tracking-tight text-[#7C7C7C]">
              {userInfo.email ? '인증' : '미인증'}
            </Text>
          </Pressable>
        </View>

        {/* 아랫 부분 */}
        <View className="mt-4 rounded-xl border-[1px] border-[#EBEBEB] px-4">
          <Pressable
            className="flex-row items-center justify-between py-4"
            onPress={toPatchUserInfoScreen}
          >
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">개인정보 수정</Text>
            <NextButton />
          </Pressable>

          <Pressable
            className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4"
            onPress={toManageAccountScreen}
          >
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">계좌관리</Text>
            <NextButton />
          </Pressable>

          <Pressable
            className="flex-row items-center justify-between border-b-[1px] border-b-[#F3F3F3] py-4"
            onPress={toHistoryScreen}
          >
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">이용내역</Text>
            <NextButton />
          </Pressable>

          <Pressable
            className="flex-row items-center justify-between py-4"
            onPress={toInquiryScreen}
          >
            <Text className="font-semibold tracking-tight text-[#3E3E3E]">문의하기</Text>
            <NextButton />
          </Pressable>
        </View>

        {/* 로그아웃, 회원탈퇴, 문의하기 */}
        <View className="mb-20 mt-8 flex-row items-center justify-between px-14">
          <Pressable onPress={logOut} className="p-4">
            <LogoutButton />
          </Pressable>

          <SplitLine />

          <Pressable onPress={toWithdarwScreen} className="p-4">
            <ResignButton />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageScreen;
