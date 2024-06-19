import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

interface TimerComponentProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ time, setTime }) => {
  useEffect(() => {
    if (time < 1) {
      return setTime(0);
    } // time이 0 이하이면 타이머를 시작하지 않음

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // time이 1 이하일 때 타이머를 멈춤
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTime]); // time을 종속성 배열에서 제거

  const formatTime = (time: number) => {
    if (time <= 0) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View>
      <Text className="text-error">{formatTime(time)}</Text>
    </View>
  );
};

export default TimerComponent;
