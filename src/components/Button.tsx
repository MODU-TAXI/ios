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
    ? `bg-disabled px-[96px] py-4 rounded-[61px]`
    : `${color} px-[96px] py-4 rounded-[61px]`;

  return (
    <Pressable className={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text className={`font-semibold text-base text-${textColor} text-center`}>
        {text}
      </Text>
    </Pressable>
  );
};

export default ButtonComponent;
