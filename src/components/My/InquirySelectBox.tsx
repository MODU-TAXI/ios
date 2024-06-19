import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import SelectDropGray from '@assets/images/Declaration/SelectDropGray.svg';
import SelectDropBlack from '@assets/images/Declaration/SelectDropBlack.svg';

type InquiryType = { type: string; content: string };

const inquiryTypes: InquiryType[] = [
  { type: 'LEAVE_CHATROOM', content: '모두의택시 이용 중 불편한 일을 겪었어요' },
  { type: 'LATE', content: '다른 유저를 신고하고 싶어요' },
  { type: 'FIRST_GONE', content: '모두의택시가 궁금해요' },
  { type: 'OUT_OF_TOUCH', content: '모두의택시를 탈퇴하고 싶어요' },
  { type: 'UNEXPECTED_ACCOUNTS', content: '택시팟 모집에 어려움이 있어요' },
  { type: 'NOT_REMIT', content: '모두의택시 사용 방법을 알려주세요' },
  { type: 'ETC', content: '기타(직접 입력하세요)' },
];

interface InquirySelectBoxComponentProps {
  setInquiryType: React.Dispatch<React.SetStateAction<string>>;
}

const InquirySelectBoxComponent: React.FC<InquirySelectBoxComponentProps> = ({
  setInquiryType,
}) => {
  return (
    <View>
      <SelectDropdown
        data={inquiryTypes}
        dropdownOverlayColor={'transparent'}
        onSelect={(selectedItem: InquiryType) => {
          setInquiryType(selectedItem.type);
        }}
        renderButton={(selectedItem) => {
          return (
            <View>
              {selectedItem ? (
                <View className="mt-2 flex-row items-center justify-between rounded-lg border-[1px] border-[#1F1F1F] px-4 py-3">
                  <Text className="font-medium tracking-tight text-[#1F1F1F]">
                    {selectedItem.content}
                  </Text>

                  <SelectDropBlack />
                </View>
              ) : (
                <View className="mt-2 flex-row items-center justify-between rounded-lg border-[1px] border-gray-400 px-4 py-3">
                  <Text className=" tracking-tight text-[#AFAFAF]">문의 유형을 선택해주세요</Text>

                  <SelectDropGray />
                </View>
              )}
            </View>
          );
        }}
        renderItem={(item, index) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
              }}
            >
              <Text className="font-medium tracking-tight text-[#5D5D5D]">{item.content}</Text>

              {index !== inquiryTypes.length - 1 && (
                <View className="mt-2 border-[0.5px] border-[#D9D9D9]" />
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 8,
  },
  dropdownItemStyle: {
    flexDirection: 'column',
    paddingHorizontal: 14,
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export default InquirySelectBoxComponent;
