import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

interface SelectBoxComponentProps {
  content: string;
}

const SelectBoxComponent: React.FC<SelectBoxComponentProps> = ({ content }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(!isPressed);
  };

  return (
    <Pressable
      onPress={handlePressIn}
      style={{
        backgroundColor: isPressed ? 'black' : '#EDEDED',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 16,
        paddingHorizontal: 18,
        paddingVertical: 29,
      }}
    >
      <Text style={{ color: isPressed ? 'white' : 'black' }}>{content}</Text>
      {/* 텍스트 색상을 변경 */}
    </Pressable>
  );
};

export default SelectBoxComponent;
