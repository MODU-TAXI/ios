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

  // TODO: 나중에 tailwind 형식으로 바꾸기
  return (
    <Pressable
      onPress={handlePressIn}
      style={{
        backgroundColor: isPressed ? 'black' : '#E2E2E2',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 16,
        paddingHorizontal: 18,
        paddingVertical: 29,
      }}
    >
      <Text style={{ color: isPressed ? 'white' : 'black', fontWeight: '600' }}>
        {content}
      </Text>
    </Pressable>
  );
};

export default SelectBoxComponent;
