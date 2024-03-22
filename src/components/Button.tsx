import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface ButtonComponentProps {
  color?: string;
  text: string;
  textColor: string;
  onPress: () => Promise<void>;
  disabled: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  color,
  text,
  textColor,
  onPress,
  disabled,
}) => {
  const buttonStyle = disabled
    ? `bg-[#C0C0C0] p-4 rounded-[61px]`
    : `${color} p-4 rounded-[61px]`;

  return (
    <View className="w-full">
      <Pressable className={buttonStyle} onPress={onPress} disabled={disabled}>
        <Text className={`font-semibold text-${textColor} text-center`}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default ButtonComponent;
