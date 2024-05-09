import { View, Text, Pressable } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';

import RoomDigestBoxComponent from '@components/RoomDigest/RoomDigestBox';

const square = (number: number) => {
  console.log('제곱 계산중...');
  return number * number;
};

const TestScreen = () => {
  const [text, setText] = useState<string>('');
  const [number, setNumber] = useState<number>(0);

  const square_value = useMemo(() => square(number), [number]);
  // const square_value = square(number);

  const queryClient = useQueryClient();

  console.log(queryClient);

  const allCachedData = queryClient.getQueryCache().findAll();

  const cachedRoomDetail = queryClient.getQueryData([`/api/rooms`, 18]);

  // console.log(cachedRoomDetail);

  console.log('All Cached Data:', allCachedData);

  return (
    <SafeAreaView className="bg-white">
      <View>
        <Text>number * number= {square_value}</Text>
      </View>

      <TextInput value={text} onChangeText={(e) => setText(e)} />
      <RoomDigestBoxComponent
        lastChatTime={3}
        departureTime={'14:25'}
        departureName={'인하대학교 후문'}
        arrivalName={'주안역'}
        currentHeadCount={2}
        wishHeadCount={3}
        expectedChargePerPerson={8300}
      />
    </SafeAreaView>
  );
};

export default TestScreen;
