import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import SelectDropGray from '@assets/images/Declaration/SelectDropGray.svg';
import SelectDropBlack from '@assets/images/Declaration/SelectDropBlack.svg';

type DeclarationType = { type: string; content: string };

const declarationTypes: DeclarationType[] = [
  { type: 'LEAVE_CHATROOM', content: '중간에 채팅방을 나갔어요' },
  { type: 'LATE', content: '제 시간에 도착하지 않았어요' },
  { type: 'FIRST_GONE', content: '먼저 출발했어요' },
  { type: 'OUT_OF_TOUCH', content: '연락이 되지 않아요' },
  { type: 'UNEXPECTED_ACCOUNTS', content: '정산 금액이 예상과 달라요' },
  { type: 'NOT_REMIT', content: '정산 금액을 보내주지 않았어요' },
  { type: 'ETC', content: '기타(직접 입력하세요)' },
];

interface SelectBoxComponentProps {
  setDeclareType: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBoxComponent: React.FC<SelectBoxComponentProps> = ({ setDeclareType }) => {
  return (
    <View>
      <SelectDropdown
        data={declarationTypes}
        dropdownOverlayColor={'transparent'}
        onSelect={(selectedItem: DeclarationType) => {
          setDeclareType(selectedItem.type);
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
                  <Text className=" tracking-tight text-[#AFAFAF]">신고 유형을 선택해주세요</Text>

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

              {index !== declarationTypes.length - 1 && (
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

export default SelectBoxComponent;
