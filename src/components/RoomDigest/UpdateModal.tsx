import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface UpdateModalComponentProps {
  updateModalVisible: boolean;
  closeUpdateModal: () => void;
  patchRoom: () => Promise<void>;
  deleteRoom: () => Promise<void>;
}

const UpdateModalComponent: React.FC<UpdateModalComponentProps> = ({
  updateModalVisible,
  closeUpdateModal,
  patchRoom,
  deleteRoom,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={updateModalVisible}>
      <View className="flex-1 flex-col justify-end">
        <Pressable className="flex-1" onPress={closeUpdateModal} />

        <View className="mx-2 mb-6 flex-col rounded-xl bg-gray-200 opacity-90">
          <Pressable className="border-b-[1px] border-white py-8" onPress={patchRoom}>
            <Text className="text-center font-semibold">수정하기</Text>
          </Pressable>

          <Pressable className="py-8" onPress={deleteRoom}>
            <Text className="text-center font-semibold text-red-500">삭제하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModalComponent;
