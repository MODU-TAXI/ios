import React, { useState } from 'react';
import { TextInput, Text, View, Pressable } from 'react-native';
import TimerComponent from './Timer';

interface InputBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  timer?: boolean;
  time?: number;
  setTime?: React.Dispatch<React.SetStateAction<number>>;
}

const InputBoxComponent: React.FC<InputBoxComponentProps> = ({
  title,
  value,
  setValue,
  placeholder,
  timer,
  time,
  setTime,
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
        isFocused
          ? 'flex-col justify-center px-5 py-4 bg-white rounded-xl border-2'
          : 'flex-col justify-center px-5 py-4 bg-[#E2E2E2] rounded-xl border-2 border-[#E2E2E2]'
      }
    >
      <Text className="text-[#626262]">{title}</Text>
      <View className="flex-row mt-1.5as">
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          className="font-semibold flex-1 mr-2"
        />

        {/* timer 있을때만 TimerComponent 적용 */}
        {timer && time && setTime && (
          <TimerComponent time={time} setTime={setTime} />
        )}
      </View>
    </Pressable>
  );
};

export default InputBoxComponent;
