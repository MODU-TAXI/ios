import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const myErrorHandler = (error: any) => {
  console.log('error comes to error handler');
  // Do something with the error
};

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: () => void;
}) {
  useEffect(() => {
    // 400 Error시에는 toast message 띄우기
    if (error.response.status == 400 && error?.response?.data?.message) {
      resetErrorBoundary();
      Toast.show({
        type: 'error',
        text1: '에러발생!',
        text2: error?.response?.data?.message,
        position: 'bottom',
      });
      return;
    }
  }, []);

  // 500 에러시에는 해당화면 보여주기
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong: </Text>
        <Button title="try Again" onPress={resetErrorBoundary} />
      </View>
    </View>
  );
}

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={myErrorHandler}
      onReset={reset}
    >
      {children}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
  },
});
