import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

interface TimerComponentProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ time, setTime }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time, setTime]);

  const getSeconds = (time: number) => {
    const seconds = Number(time % 60);
    if (seconds < 10) {
      return '0' + String(seconds);
    } else {
      return String(seconds);
    }
  };

  return (
    <View>
      <Text className="text-error">
        {Math.floor(time / 60)}:{getSeconds(time)}
      </Text>
    </View>
  );
};

export default TimerComponent;
