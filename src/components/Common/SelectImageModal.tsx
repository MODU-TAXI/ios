import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface SelectImageModalProps {
  modalVisible: boolean;
  closeSelectImageModal: () => void;
  selectImageFromCamera: () => Promise<void>;
  selectImageFromAlbum: () => Promise<void>;
}

const SelectImageModal: React.FC<SelectImageModalProps> = ({
  modalVisible,
  closeSelectImageModal,
  selectImageFromCamera,
  selectImageFromAlbum,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        className="flex-1 flex-col justify-end"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <Pressable className="flex-1" onPress={closeSelectImageModal} />

        <View
          className="mx-2 mb-8 rounded-[13px] "
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.90)' }}
        >
          <Pressable className="px-4 py-[18px]" onPress={selectImageFromCamera}>
            <Text className="text-center text-[20px] text-[#007AFF]">사진으로 찍기</Text>
          </Pressable>

          <View className="border-b-[1px] border-[#3C3C43] opacity-30" />

          <Pressable className="px-4 py-[18px]" onPress={selectImageFromAlbum}>
            <Text className="text-center text-[20px] text-[#007AFF]">앨범에서 선택</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SelectImageModal;
