import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';

interface InputBoxComponentProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  error: boolean;
}

const InputBoxComponent: React.FC<InputBoxComponentProps> = ({
  value,
  setValue,
  placeholder,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false); // focusing 여부 판별 변수

  const inputRef = React.useRef<TextInput>(null); // focusing ref

  // TextInput value change 함수
  const valueHandleChange = (text: string) => {
    setValue(text);
  };

  // TextInput 밖에 영역 클릭 시에도 focusing 하게 하는 함수
  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 다른 곳에 focusing 옮겨졌을때 기존 focusing 없애는 함수
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Pressable
      onPress={handleFocus}
      className={
        !isFocused
          ? 'flex-col justify-center rounded-xl border-[1px] border-[#E2E2E2] bg-white px-4 py-5'
          : error
            ? 'flex-col justify-center rounded-xl border-[1px] border-warning bg-white px-4 py-5'
            : 'flex-col justify-center rounded-xl border-[1px] border-main bg-white px-4 py-5'
      }
    >
      <View className="flex-row">
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          keyboardType="numeric"
          className="text-[16px] font-medium"
        />
      </View>
    </Pressable>
  );
};

export default InputBoxComponent;
