import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

interface ButtonComponentProps {
  color?: string;
  text: string;
  textColor: string;
  onPress: () => Promise<void>;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  color,
  text,
  textColor,
  onPress,
}) => {
  return (
    <View className="w-full my-2">
      <Pressable className={`${color} p-4 rounded-[12px]`} onPress={onPress}>
        <Text className={`font-semibold text-${textColor} text-center`}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default ButtonComponent;
