import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LoginStackParamList } from '@type/ParamLists';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteMyChatInfo } from '@server/api/chat';
import { useChatContext } from 'src/providers/chatProvider';

const HomeScreen = () => {
  const { disConnect } = useChatContext();

  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();

  const chatOut = async () => {
    disConnect();
    await deleteMyChatInfo();
  };

  const toMatchScreen = () => {
    navigation.navigate('MatchScreen');
  };

  const toCreateMatchScreen = () => {
    navigation.navigate('CreateMatchScreen');
  };

  const toMapScreen = () => {
    navigation.navigate('MainMapScreen');
  };

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  const toChatRoomScreen = () => {
    navigation.navigate('ChatRoomScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-col">
        <Pressable
          onPress={toMatchScreen}
          className="bg-gray-300  h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>매칭 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toCreateMatchScreen}
          className=" bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>매칭 생성스크린</Text>
        </Pressable>

        <Pressable
          onPress={toMapScreen}
          className=" bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>맵 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toSearchScreen}
          className=" bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>검색 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toChatRoomScreen}
          className=" bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>채팅 스크린</Text>
        </Pressable>

        <Pressable
          onPress={chatOut}
          className=" bg-gray-300 h-20 m-5 rounded-md justify-center items-center"
        >
          <Text>채팅방 나가기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
