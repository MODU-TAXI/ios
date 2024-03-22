import React from 'react';
import { View } from 'react-native';

interface ProgressBarComponentProps {
  previousDealt: string;
  dealt: string;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  previousDealt,
  dealt,
}) => {
  return (
    <View className="flex-1">
      <View className="flex-1 h-1 bg-[#E2E2E2]">
        <View className={`flex-1 h-1 bg-black ${dealt} rounded-r-full`}></View>
      </View>
    </View>
  );
};

export default ProgressBarComponent;
