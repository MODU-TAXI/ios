import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import HeaderComponent from '@components/Header';
import ButtonComponent from '@components/Button';
import InputBoxComponent from '@components/InputBox';
import TransparentLoadingComponent from '@components/Common/TransparentLoading';

import { UserRecoil } from '@recoil/types/user';
import { userRecoilState } from '@recoil/states/user';

import { useDeleteAllNotifee } from '@hooks/notifee';
import { useRegisterNickname } from '@hooks/api/member';

import { InfoToastMessage } from '@utils/toastMessage';

import { PatchNicknameScreenProps } from '@type/param/loginStack';

const PatchNicknameScreen = ({ navigation }: PatchNicknameScreenProps) => {
  useDeleteAllNotifee();

  const [userRecoil, setUserRecoil] = useRecoilState<UserRecoil>(userRecoilState);
  const [nickname, setNickname] = useState<string>(userRecoil.nickname);
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러메세지

  const { mutateAsync: registerNickname, isPending: registerNicknamePending } =
    useRegisterNickname(setErrorMessage);

  // 닉네임 유효성 체크
  const checkNickname = async (): Promise<void> => {
    if (nickname.trim() === '') {
      return setErrorMessage('닉네임은 공백일 수 없습니다.');
    }

    const trimNickname = nickname.trim();

    await registerNickname({ nickname: trimNickname });

    setErrorMessage('');

    setUserRecoil({
      id: userRecoil.id,
      name: userRecoil.name,
      nickname: trimNickname,
      gender: userRecoil.gender,
      phoneNumber: userRecoil.phoneNumber,
      email: userRecoil.email,
      imageUrl: userRecoil.imageUrl,
      matchingCount: userRecoil.matchingCount,
      blocked: userRecoil.blocked,
    });

    navigation.goBack();

    InfoToastMessage('닉네임이 변경되었습니다');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {registerNicknamePending && <TransparentLoadingComponent />}

      <HeaderComponent title="닉네임 변경" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          <View className="mx-6 flex-1">
            {/* Input 컴포넌트 */}
            <View className="mt-6">
              <InputBoxComponent
                title="닉네임"
                value={nickname}
                setValue={setNickname}
                placeholder="한글,영문 2~12자"
              />
            </View>

            {/* 경고 메세지 */}
            {errorMessage && (
              <View className="mt-2 px-2">
                <Text className="font-medium text-error">{errorMessage}</Text>
              </View>
            )}

            {/* 버튼을 아래로 내리기 위한 View */}
            <View className="flex-1"></View>

            {/* 확인 버튼 */}
            <View className="mx-3 mb-11">
              <ButtonComponent
                color={'bg-main'}
                borderColor={'border-main'}
                textColor={'white'}
                text={'변경하기'}
                disabled={nickname === userRecoil.nickname}
                onPress={checkNickname}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PatchNicknameScreen;
