import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useQueryErrorResetBoundary } from '@tanstack/react-query'; // react-query v5 라이브러리
const myErrorHandler = (error: Error) => {
  console.log('error comes to error handler');
  // Do something with the error
};

function ErrorFallback({ error, resetErrorBoundary }) {
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
