import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface ExitModalComponentProps {
  exitModalVisible: boolean;
  closeExitModal: () => void;
  exitRoom: () => Promise<void>;
}

const ExitModalComponent: React.FC<ExitModalComponentProps> = ({
  exitModalVisible,
  closeExitModal,
  exitRoom,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={exitModalVisible}>
      <View
        className="flex-1 flex-col justify-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <Pressable className="flex-1" onPress={closeExitModal} />

        <View
          className="mx-2 mb-8 rounded-[13px] "
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.90)' }}
        >
          <Pressable className="px-4 py-[18px]" onPress={exitRoom}>
            <Text className="text-center text-[20px] text-warning">방 탈퇴하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ExitModalComponent;
