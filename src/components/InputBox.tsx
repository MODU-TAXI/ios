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
    <View className="flex-col justify-center h-16 px-3 my-4 bg-gray-300 rounded-md">
      <Text>{title}</Text>
      <TextInput
        value={value}
        onChange={valueHandleChange}
        placeholder={placeholder}
        className="my-1"
      />
    </View>
  );
};

export default InputBoxComponent;
