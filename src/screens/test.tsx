import React, { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const square = (number: number) => {
  console.log('제곱 계산중...');
  return number * number;
};

const TestScreen = () => {
  const [text, setText] = useState<string>('');
  const [number, setNumber] = useState<number>(0);

  const square_value = useMemo(() => square(number), [number]);
  // const square_value = square(number);

  return (
    <SafeAreaView>
      <View>
        <Text>number * number= {square_value}</Text>
      </View>

      <TextInput value={text} onChangeText={(e) => setText(e)} />
    </SafeAreaView>
  );
};

export default TestScreen;
