import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

interface PhoneNumberInputBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const PhoneNumberInputBoxComponent: React.FC<PhoneNumberInputBoxComponentProps> = ({
  title,
  value,
  setValue,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false); // focusing 여부 판별 변수

  const inputRef = React.useRef<TextInput>(null); // focusing ref

  // 입력된 전화번호를 형식에 맞게 변환하는 함수
  const formatPhoneNumber = (input: string) => {
    const cleaned = ('' + input).replace(/\D/g, '');

    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return input;
  };

  // TextInput value change 함수
  const valueHandleChange = (text: string) => {
    const formatted = formatPhoneNumber(text);

    // 13자 이상으로 입력 불가하게 만듦
    if (formatted.length <= 13) {
      setValue(formatted);
    }
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
        isFocused
          ? 'flex-col justify-center rounded-xl border-2 bg-white px-5 py-4'
          : 'flex-col justify-center rounded-xl border-2 border-[#E2E2E2] bg-[#E2E2E2] px-5 py-4'
      }
    >
      <Text className="text-[#626262]">{title}</Text>
      <View className="mt-1.5 flex-row">
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          keyboardType="numeric"
          className="mr-2 flex-1 font-semibold"
        />
      </View>
    </Pressable>
  );
};

export default PhoneNumberInputBoxComponent;
