import { View, Text } from 'react-native';
import React, { useRef, useMemo, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import BanksComponent from '@components/Calculate/Banks';

interface BankModalComponentProps {
  bankModalIndex: number;
  closeBankModal: (index: number) => void;
  setBank: React.Dispatch<React.SetStateAction<string>>;
}

const BankModalComponent: React.FC<BankModalComponentProps> = ({
  bankModalIndex,
  closeBankModal,
  setBank,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['1%', '85%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    [],
  );

  return (
    <BottomSheet
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 16,
      }}
      index={bankModalIndex}
      ref={bottomSheetRef}
      onChange={closeBankModal}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
    >
      <View className="flex-1 px-[18px]">
        {/* 글씨 */}
        <View className="ml-1 pt-5">
          <Text className="text-[20px] font-semibold tracking-tight text-[#1F1F1F]">
            은행을 선택해주세요
          </Text>
        </View>

        {/* 은행들 */}
        <BanksComponent closeBankModal={closeBankModal} setBank={setBank} />
      </View>
    </BottomSheet>
  );
};

export default BankModalComponent;
