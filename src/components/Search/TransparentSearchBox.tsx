import { useRecoilValue } from 'recoil';
import {
  Text,
  View,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

import { SignUpUser } from '@recoil/type';
import { signUpUserState } from '@recoil/recoil';

import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';

/** 검색 바 */
const TransparentSearchBoxComponent = () => {
  const signUpUser = useRecoilValue<SignUpUser>(signUpUserState);

  return (
    <View className="mx-4 flex flex-row">
      {/** 검색창 */}
      <View
        className="flex h-full flex-1 flex-row items-center rounded-xl bg-white p-2 opacity-80"
      >
        <View className="px-1">
          <MagnifyingGlassMainSvg></MagnifyingGlassMainSvg>
        </View>
        <Text className="font-medium text-base text-gray600">{signUpUser.name}님 우리 어디로 떠날까요?</Text>
      </View>
    </View>
  );
};

export default TransparentSearchBoxComponent;
