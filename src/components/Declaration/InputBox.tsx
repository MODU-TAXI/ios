import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface InputBoxComponentProps {
  declareContent: string;
  setDeclareContent: React.Dispatch<React.SetStateAction<string>>;
}

const InputBoxComponent: React.FC<InputBoxComponentProps> = ({
  declareContent,
  setDeclareContent,
}) => {
  return (
    <View>
      {declareContent ? (
        <View className="mt-2 rounded-lg border-[1px] border-[#1F1F1F] px-4 py-3">
          <TextInput
            value={declareContent}
            onChangeText={setDeclareContent}
            className="h-[230px]"
            multiline={true}
            placeholder="신고 내용을 입력해주세요"
          />
        </View>
      ) : (
        <View className="mt-2 rounded-lg border-[1px] border-[#AFAFAF] px-4 py-3">
          <TextInput
            value={declareContent}
            onChangeText={setDeclareContent}
            className="h-[230px]"
            multiline={true}
            placeholder="신고 내용을 입력해주세요"
          />
        </View>
      )}
    </View>
  );
};

export default InputBoxComponent;
