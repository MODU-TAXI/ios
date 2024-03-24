import React from 'react';
import {
  TextInput,
  Text,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
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
  const valueHandleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setValue(e.nativeEvent.text);
  };

  return (
    <View className="flex-col justify-center px-5 py-4 bg-[#E2E2E2] rounded-xl">
      <Text className="text-[#626262]">{title}</Text>
      <TextInput
        value={value}
        onChange={valueHandleChange}
        placeholder={placeholder}
        className="mt-1.5 font-semibold"
      />
    </View>
  );
};

export default InputBoxComponent;
