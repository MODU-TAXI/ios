import React from 'react';
import { View, Text } from 'react-native';

interface DescriptionComponentProps {
  description: string;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  description,
}) => {
  return (
    <View>
      <Text className="text-[20px] font-semibold">{description}</Text>
    </View>
  );
};

export default DescriptionComponent;
