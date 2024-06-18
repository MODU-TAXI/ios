import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface InquiryInputBoxComponentProps {
  inquiryContent: string;
  setInquiryContent: React.Dispatch<React.SetStateAction<string>>;
}

const InquiryInputBoxComponent: React.FC<InquiryInputBoxComponentProps> = ({
  inquiryContent,
  setInquiryContent,
}) => {
  return (
    <View>
      {inquiryContent ? (
        <View className="mt-2 rounded-lg border-[1px] border-[#1F1F1F] px-4 py-3">
          <TextInput
            value={inquiryContent}
            onChangeText={setInquiryContent}
            className="h-[230px]"
            multiline={true}
            placeholder="문의 내용을 입력해주세요"
          />
        </View>
      ) : (
        <View className="mt-2 rounded-lg border-[1px] border-[#AFAFAF] px-4 py-3">
          <TextInput
            value={inquiryContent}
            onChangeText={setInquiryContent}
            className="h-[230px]"
            multiline={true}
            placeholder="문의 내용을 입력해주세요"
          />
        </View>
      )}
    </View>
  );
};

export default InquiryInputBoxComponent;
