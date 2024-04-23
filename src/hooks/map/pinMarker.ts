import React from 'react';

interface PinMarkerProps {
  id: number;
  longitude: number;
  latitude: number;
  spotName: string;
}

interface PinMarkerOutput {
  id: number;
  coord: {
    latitude: number;
    longitude: number;
  };
  spotName: string;
}

/** rooms 배열을 받아 coord 형으로 변환 */
const pinMarker = (rooms: PinMarkerProps[]): PinMarkerOutput[] => {
  return rooms.map(({ id, longitude, latitude, spotName }) => ({
    id,
    coord: { latitude, longitude },
    spotName,
  }));
};

export default pinMarker;
