import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ButtonComponentProps {
  color: string;
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
    <View className="w-full px-10 my-2">
      <Pressable className={`bg-${color} p-4 rounded-[12px]`} onPress={onPress}>
        <Text className={`text-${textColor} text-center`}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonComponent;
