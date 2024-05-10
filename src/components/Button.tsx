import React from 'react';
import { Text, Pressable } from 'react-native';

interface ButtonComponentProps {
  color: string;
  borderColor: string;
  textColor: string;
  text: string;
  disabled: any;
  onPress: () => Promise<void> | void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  color,
  borderColor,
  textColor,
  text,
  onPress,
  disabled,
}) => {
  const buttonStyle = disabled
    ? `bg-disabled px-[96px] py-4 border-2 border-disabled rounded-[61px]`
    : `${color} px-[96px] py-4 border-2 ${borderColor} rounded-[61px]`;

  return (
    <Pressable className={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text className={`text-${textColor} text-center font-semibold text-base`}>{text}</Text>
    </Pressable>
  );
};

export default ButtonComponent;
