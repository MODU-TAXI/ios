import React from 'react';
import { Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { LoginStackParamList } from 'src/types/ParamLists';
import { useChatContext } from 'src/providers/chatProvider';

import { deleteMyChatInfo } from '@server/api/chat';

const HomeScreen = () => {
  const { disConnect } = useChatContext();

  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();

  const chatOut = async () => {
    disConnect();
    await deleteMyChatInfo();
  };

  const toRoomScreen = () => {
    navigation.navigate('RoomDetailScreen');
  };

  const toCreateRoomScreen = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toMapScreen = () => {
    navigation.navigate('MainMapScreen');
  };

  const toSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  const toChatRoomScreen = async () => {
    navigation.navigate('ChatRoomScreen');
  };

  const toTestScreen = async () => {
    navigation.navigate('TestScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-col">
        <Pressable
          onPress={toRoomScreen}
          className="m-5  h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>매칭 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toCreateRoomScreen}
          className=" m-5 h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>매칭 생성스크린</Text>
        </Pressable>

        <Pressable
          onPress={toMapScreen}
          className=" m-5 h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>맵 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toSearchScreen}
          className=" m-5 h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>검색 스크린</Text>
        </Pressable>

        <Pressable
          onPress={toChatRoomScreen}
          className=" m-5 h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>채팅 스크린</Text>
        </Pressable>

        <Pressable
          onPress={chatOut}
          className=" m-5 h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>채팅방 나가기</Text>
        </Pressable>

        <Pressable
          onPress={toTestScreen}
          className=" m-5 h-20 items-center justify-center rounded-md bg-gray-300"
        >
          <Text>테스트방</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
