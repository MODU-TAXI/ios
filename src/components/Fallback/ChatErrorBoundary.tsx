import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text, Alert, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { LoginStackParamList } from '@type/param/loginStack';

// error-boundary까지 온 에러들 분기 처리
const ErrorFallback = ({
  error,
  resetErrorBoundary,
  navigation,
}: {
  error: any;
  resetErrorBoundary: () => void;
  navigation: NavigationProp<LoginStackParamList>;
}) => {
  useEffect(() => {
    Alert.alert(
      'ROOM ERROR',
      '존재하지 않는 방입니다.',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainScreen' }],
            }),
        },
      ],
      { cancelable: false },
    );
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col items-center justify-center">
        <Text> 존재하지 않는 방입니다! </Text>
        <Button
          title="try Again"
          onPress={() => {
            resetErrorBoundary();
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const ChatErrorBoundary = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: any;
}) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ErrorFallback {...props} navigation={navigation} />}
      onReset={reset}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ChatErrorBoundary;
