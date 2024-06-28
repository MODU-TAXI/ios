import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

interface TimerComponentProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ time, setTime }) => {
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, setTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      <Text className="text-error">{formatTime(time)}</Text>
    </View>
  );
};

export default TimerComponent;
