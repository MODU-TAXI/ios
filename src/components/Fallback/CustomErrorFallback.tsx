import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Props = { error: Error; resetError: () => void };

// 에러시 보여주는 화면
const CustomErrorFallback = ({ error, resetError }: Props) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text>Something happened!</Text>
        <Text>{error.message}</Text>
        <Text>Please try again.</Text>
        <Button title="Refresh" onPress={resetError} />
      </View>
    </SafeAreaView>
  );
};

export default CustomErrorFallback;
