import React from 'react';
import { View } from 'react-native';

import DisplayButtonComponent from './DisplayButton';
import DisplayStatusBarComponent from './DisplayStatusBar';

interface RoomStatusComponentProps {
  roomStatus: string | undefined;
  myRoom: boolean;
  completeMatch: () => Promise<void>;
  toCalculateScreen: () => void;
  toPaymentScreen: () => void;
}

const RoomStatusComponent: React.FC<RoomStatusComponentProps> = ({
  roomStatus,
  myRoom,
  completeMatch,
  toCalculateScreen,
  toPaymentScreen,
}) => {
  return (
    <View className="mt-4 bg-transparent px-4">
      <View
        style={{ backgroundColor: 'rgba(40, 40, 40, 0.71)' }}
        className="flex items-center justify-center rounded-xl px-4 pb-4 pt-5"
      >
        <DisplayStatusBarComponent roomStatus={roomStatus} />

        <DisplayButtonComponent
          roomStatus={roomStatus}
          myRoom={myRoom}
          completeMatch={completeMatch}
          toCalculateScreen={toCalculateScreen}
          toPaymentScreen={toPaymentScreen}
        />
      </View>
    </View>
  );
};

export default RoomStatusComponent;
