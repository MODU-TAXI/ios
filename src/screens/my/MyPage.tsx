import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyPageScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 items-center justify-center">
        <Text>마이페이지</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;
