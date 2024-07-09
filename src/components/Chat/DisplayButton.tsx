import React from 'react';
import { Text, Pressable } from 'react-native';

interface DisplayButtonComponentProps {
  roomStatus: string | undefined;
  myRoom: boolean;
  completeMatch: () => Promise<void>;
  toCalculateScreen: () => void;
  toPaymentScreen: () => void;
}

const DisplayButtonComponent: React.FC<DisplayButtonComponentProps> = ({
  roomStatus,
  myRoom,
  completeMatch,
  toCalculateScreen,
  toPaymentScreen,
}) => {
  if (roomStatus === 'BEFORE_MATCHING' && myRoom) {
    return (
      <Pressable className="mt-3 w-full rounded-lg bg-main px-4 py-3" onPress={completeMatch}>
        <Text className="text-center font-semibold text-white">매칭완료</Text>
      </Pressable>
    );
  } else if (roomStatus === 'AFTER_MATCHING' && myRoom) {
    return (
      <Pressable className="mt-3 w-full rounded-lg bg-main px-4 py-3" onPress={toCalculateScreen}>
        <Text className="text-center font-semibold text-white">정산하기</Text>
      </Pressable>
    );
  } else if (roomStatus === 'BEFORE_PAYMENT') {
    // 방장의 경우
    if (myRoom) {
      return (
        <Pressable className="mt-3 w-full rounded-lg bg-main px-4 py-3" onPress={toPaymentScreen}>
          <Text className="text-center font-semibold text-white">정산현황</Text>
        </Pressable>
      );
    }

    // 참여자의 경우
    return (
      <Pressable className="mt-3 w-full rounded-lg bg-main px-4 py-3" onPress={toPaymentScreen}>
        <Text className="text-center font-semibold text-white">정산하기</Text>
      </Pressable>
    );
  }

  return null;
};

export default React.memo(DisplayButtonComponent);
