import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import TraySvg from '../../assets/images/signIn/SignIn/tray.svg';
import BellSvg from '../../assets/images/signIn/SignIn/bell.svg';
import CameraSvg from '../../assets/images/signIn/SignIn/camera.svg';
import LocationSvg from '../../assets/images/signIn/SignIn/location.svg';
import ButtonComponent from '@components/Button';

interface PermissionItemProps {
  icon: React.FC;
  title: string;
  description: string;
}

const AuthenticationScreen = () => {
  const toNext = async (): Promise<void> => {
    return;
  };

  // 권한 component
  const PermissionItem: React.FC<PermissionItemProps> = ({
    icon: IconComponent,
    title,
    description,
  }) => {
    return (
      <View className="flex-row items-center my-5">
        {/* 권한 아이콘 */}
        <View className="flex justify-center items-center w-10 h-10 rounded-full bg-basic">
          <IconComponent />
        </View>

        {/* 권한 설명 */}
        <View className="flex mx-3">
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-md">{description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-12">
        {/* 맨 상단 안내 메세지*/}
        <View className="flex items-center mt-14">
          <Text className="text-2xl font-bold">앱 서비스 접근 권한 안내</Text>
          <Text className="mt-2 text-xs text-slate-500 text-center">
            권한을 허용하지 않아도 모두의 택시를 이용할 수 있지만
          </Text>
          <Text className="text-xs text-slate-500 text-center">
            일부 서비스가 제한될 수 있어요
          </Text>
        </View>

        {/* 권한 확인 목록들 */}
        <View className="flex-1 justify-center px-5 mb-14">
          <PermissionItem
            icon={TraySvg}
            title="기기 및 앱 기록"
            description="서비스 개선 및 오류 확인"
          />

          <PermissionItem
            icon={BellSvg}
            title="알림"
            description="푸시 알림 및 메세지 수신 안내"
          />

          <PermissionItem
            icon={CameraSvg}
            title="사진/카메라"
            description="카풀팟에서 사진 업로드"
          />

          <PermissionItem
            icon={LocationSvg}
            title="위치"
            description="현재 위치 주변의 카풀팟 찾기 가능"
          />
        </View>

        <ButtonComponent
          color={'black'}
          text={'확인'}
          textColor={'white'}
          onPress={toNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthenticationScreen;
