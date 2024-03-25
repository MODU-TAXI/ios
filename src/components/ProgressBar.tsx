import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface ProgressBarComponentProps {
  previousDealt: number;
  dealt: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  previousDealt,
  dealt,
}) => {
  const widthAnim = useRef(new Animated.Value(previousDealt)).current;

  useEffect(() => {
    // dealt 값이 변경될 때 마다 애니메이션 실행
    Animated.timing(widthAnim, {
      toValue: dealt,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [dealt]);

  /** 프로그레스 바 + 애니메이션 */
  const AnimatedBar = () => {
    return (
      <Animated.View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: 'black',
          borderRadius: 50,
          // 0~100 -> 0%~100% 로 매핑
          width: widthAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      ></Animated.View>
    );
  };

  return (
    <View className="flex-1">
      <View className="flex-1 h-1 bg-[#E2E2E2]">
        <AnimatedBar />
      </View>
    </View>
  );
};

export default ProgressBarComponent;
