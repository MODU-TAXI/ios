import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TestScreen = () => {
  const [number, setNumber] = useState<number>();
  const [test, setTest] = useState<string[]>([]);

  const addNumber = () => {
    console.log('함수 재정의 됨');
  };

  const addNumber2 = useCallback(() => {
    console.log(number);
  }, []);

  const pressArr = () => {
    setTest((prev) => [...prev, 'a']);
  };

  addNumber();

  addNumber2();

  return (
    <SafeAreaView>
      <Pressable onPress={pressArr}>
        <Text>dd</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default TestScreen;
