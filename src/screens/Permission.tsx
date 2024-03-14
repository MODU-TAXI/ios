import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import usePermissions from '../hooks/usePermissions';

const PermissionScreen = () => {
  usePermissions();

  return (
    <SafeAreaView className="flex-1">
      <View className="justify-center align-middle">
        <Text>권한 허용하실?</Text>
        <Pressable className="p-10 bg-slate-500">
          <Text>ㄱㄱ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PermissionScreen;
