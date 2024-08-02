import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '@components/Button';

import { CheckPermissionScreenProps } from '@type/param/rootStack';

import BellSvg from '@assets/images/SignUp/bell.svg';
import TraySvg from '@assets/images/SignUp/tray.svg';
import CameraSvg from '@assets/images/SignUp/camera.svg';
import LocationSvg from '@assets/images/SignUp/location.svg';

interface PermissionItemProps {
  icon: React.FC;
  title: string;
  description: string;
}

const CheckPermissionScreen = ({ navigation }: CheckPermissionScreenProps) => {
  const toNext = async (): Promise<void> => {
    navigation.navigate('AuthenticationScreen');
  };

  // 권한 component
  const PermissionItem: React.FC<PermissionItemProps> = ({
    icon: IconComponent,
    title,
    description,
  }) => {
    return (
      <View className="my-5 flex-row items-center">
        {/* 권한 아이콘 */}
        <View className="size-10 flex items-center justify-center rounded-full bg-[#E2E2E2]">
          <IconComponent />
        </View>

        {/* 권한 설명 */}
        <View className="mx-3 flex">
          <Text className="text-lg font-bold">{title}</Text>
          <Text className="text-md">{description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <View className="mx-6 flex-1">
        {/* 맨 상단 안내 메세지*/}
        <View className="mt-14 flex items-center">
          <Text className="text-2xl font-bold">앱 서비스 접근 권한 안내</Text>
          <Text className="mt-2 text-center text-xs text-slate-500">
            권한을 허용하지 않아도 모두의 택시를 이용할 수 있지만
          </Text>
          <Text className="text-center text-xs text-slate-500">일부 서비스가 제한될 수 있어요</Text>
        </View>

        {/* 권한 확인 목록들 */}
        <View className="mb-14 flex-1 justify-center px-5">
          <PermissionItem
            icon={TraySvg}
            title="기기 및 앱 기록"
            description="서비스 개선 및 오류 확인"
          />

          <PermissionItem icon={BellSvg} title="알림" description="푸시 알림 및 메세지 수신 안내" />

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

        <View className="mx-3 mb-10">
          <ButtonComponent
            color={'bg-main'}
            borderColor={'border-main'}
            textColor={'white'}
            text={'확인'}
            disabled={false}
            onPress={toNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckPermissionScreen;
