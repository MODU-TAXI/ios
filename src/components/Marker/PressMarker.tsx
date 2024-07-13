import React from 'react';
import { View } from 'react-native';

import MapPin from '@assets/images/Map/MapPin.svg';
import MapPinGray from '@assets/images/Map/MapPinGray.svg';

interface PressMarkerProps {
  isTouching: boolean;
}

const PressMarkerComponent: React.FC<PressMarkerProps> = ({
  isTouching,
}) => {
  return (
    <View>
      {!isTouching ? (
        <View className="-translate-x-6 -translate-y-6">
          <MapPin width={48} height={48} />
        </View>
      ) : (
        <View className="-translate-x-6 -translate-y-7">
          <MapPinGray width={48} height={52} />
        </View>
      )}
    </View>
  )
}

export default PressMarkerComponent;