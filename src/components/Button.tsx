import React from 'react';
import { Pressable, Text } from 'react-native';

interface ButtonComponentProps {
  color: string;
  borderColor: string;
  textColor: string;
  text: string;
  disabled: any;
  onPress: () => Promise<void>;
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
      <Text className={`font-semibold text-base text-${textColor} text-center`}>
        {text}
      </Text>
    </Pressable>
  );
};

export default ButtonComponent;
