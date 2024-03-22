import React, { useEffect } from 'react';
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
    ? `bg-disabled p-4 rounded-[12px]`
    : `${color} p-4 rounded-[12px]`;

  return (
    <View className="w-full my-2">
      <Pressable className={buttonStyle} onPress={onPress} disabled={disabled}>
        <Text className={`font-semibold text-${textColor} text-center`}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default ButtonComponent;
