import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import sendMessageToSentry from '@utils/sentry';
import { ErrorToastMessage } from '@utils/toastMessage';

// error-boundary까지 온 에러들 처리
const errorHandler = (error: any) => {
  sendMessageToSentry(error);
};

// error-boundary까지 온 에러들 분기 처리
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: () => void;
}) => {
  useEffect(() => {
    // 400 Error시에는 toast message 띄우기
    if (error?.response?.status == 400 && error?.response?.data?.message) {
      resetErrorBoundary();
      return ErrorToastMessage(error.response.data.message);
    }
  }, [error?.response?.status, error?.response?.data?.message, resetErrorBoundary]);

  // 500 에러시에는 재시도 화면 보여주기
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col items-center justify-center">
        <Text> Something went wrong: </Text>
        <Button title="try Again" onPress={resetErrorBoundary} />
      </View>
    </SafeAreaView>
  );
};

export const CustomErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
};
