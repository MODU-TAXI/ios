import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LoginStackParamList } from '@type/ParamLists';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();

  const toMatchScreen = () => {
    navigation.navigate('MatchScreen');
  };

  const toMapScreen = () => {
    navigation.navigate('NaverMapScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row">
        <Pressable
          onPress={toMatchScreen}
          className="flex-1 bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>매칭 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toMapScreen}
          className="flex-1 bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>맵 스크린</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
