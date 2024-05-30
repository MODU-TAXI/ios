import { useRecoilValue } from 'recoil';
import {
  Text,
  View,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';

import MagnifyingGlassMainSvg from '@assets/images/Search/MagnifyingGlassMain.svg';

interface TransparentSearchBoxComponentProps {
  value: string;
  isSearched: boolean;
}

/** 메인맵 반투명 검색 바 */
const TransparentSearchBoxComponent: React.FC<TransparentSearchBoxComponentProps> = ({
  value,
  isSearched,
}) => {

  return (
    <View className="mx-4 flex flex-row">
      {/** 검색창 */}
      <View
        className="flex h-full flex-1 flex-row items-center rounded-xl bg-white p-2 opacity-80"
      >
        <View className="px-1">
          <MagnifyingGlassMainSvg></MagnifyingGlassMainSvg>
        </View>
        {isSearched ? (
          <Text className="font-medium text-base text-gray900">{value}</Text>
        ) : (
          <Text className="font-medium text-base text-gray600">{value}</Text>
        )}
      </View>
    </View>
  );
};

export default TransparentSearchBoxComponent;
