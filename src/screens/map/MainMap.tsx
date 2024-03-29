import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapBottomSheetScreen from './MapBottomSheet';

const MainMapScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 화면의 어디에서 멈추는지 snap point
  // TODO: '100%' 일 때 하나의 스크린처럼 보이도록 상단 헤더 렌더링 및 기존 컴포넌트 내리기
  const snapPoints = useMemo(() => ['40%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  // 배경 터치시 복귀
  const handleBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={-1}
        disappearsOnIndex={1}
      />
    ),
    [],
  );

  // renders
  return (
    <GestureHandlerRootView className="flex-1">
      <View style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={handleBackDrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <MapBottomSheetScreen />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MainMapScreen;
