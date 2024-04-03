import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from 'react-native';

interface InputBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const InputBoxComponent: React.FC<InputBoxComponentProps> = ({
  title,
  value,
  setValue,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false); // focusing 여부 판별 변수

  const inputRef = React.useRef<TextInput>(null); // focusing ref

  // TextInput value change 함수
  const valueHandleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(e.nativeEvent.text);
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
    <>
      {isFocused ? (
        <Pressable
          onPress={handleFocus}
          className="flex-col justify-center px-5 py-4 bg-white rounded-xl border-2"
        >
          <Text className="text-[#626262]">{title}</Text>
          <TextInput
            ref={inputRef}
            value={value}
            onBlur={handleBlur}
            onChange={valueHandleChange}
            placeholder={placeholder}
            placeholderTextColor="#C0C0C0"
            className="mt-1.5 font-semibold"
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={handleFocus}
          className="flex-col justify-center px-5 py-4 bg-[#E2E2E2] rounded-xl"
        >
          <Text className="text-[#626262]">{title}</Text>
          <TextInput
            ref={inputRef}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={valueHandleChange}
            placeholder={placeholder}
            placeholderTextColor="#C0C0C0"
            className="mt-1.5 font-semibold"
          />
        </Pressable>
      )}
    </>
  );
};

export default InputBoxComponent;
