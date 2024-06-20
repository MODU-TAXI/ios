import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface UpdateModalComponentProps {
  updateModalVisible: boolean;
  closeUpdateModal: () => void;
  patchRoom: () => Promise<void>;
  checkDeleteRoom: () => Promise<void>;
}

const UpdateModalComponent: React.FC<UpdateModalComponentProps> = ({
  updateModalVisible,
  closeUpdateModal,
  patchRoom,
  checkDeleteRoom,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={updateModalVisible}>
      <View
        className="flex-1 flex-col justify-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <Pressable className="flex-1" onPress={closeUpdateModal} />

        <View
          className="mx-2 mb-8 rounded-[13px] "
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.90)' }}
        >
          <Pressable className="px-4 py-[18px]" onPress={patchRoom}>
            <Text className="text-center text-[20px] text-[#007AFF]">방 수정하기</Text>
          </Pressable>

          <View className="border-b-[1px] border-[#3C3C43] opacity-30" />

          <Pressable className="px-4 py-[18px]" onPress={checkDeleteRoom}>
            <Text className="text-center text-[20px] text-warning">방 삭제하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModalComponent;
