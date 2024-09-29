import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Text, Linking, Pressable, Dimensions } from 'react-native';

import AdvertiseBanner1 from '@assets/images/Home/AdvertiseBanner1.svg';
import AdvertiseBanner2 from '@assets/images/Home/AdvertiseBanner2.svg';

const AdvertiseBannerComponent: React.FC = () => {
  const [advertiseIndex, setAdvertiseIndex] = useState<number>(0);

  const width = Dimensions.get('window').width;

  // 이미지와 URL을 객체로 묶어서 배열로 설정
  const advertiseBanners = [
    { image: AdvertiseBanner1, url: 'https://www.naver.com' },
    { image: AdvertiseBanner2, url: 'https://www.naver.com' },
  ];

  // 이미지 클릭 시 해당 URL로 이동
  const handleImagePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="mx-4 mt-4 rounded-xl">
      <Carousel
        loop
        width={width - 32}
        height={124}
        autoPlay={true}
        data={advertiseBanners} // 이미지 데이터를 전달
        scrollAnimationDuration={600}
        autoPlayInterval={3000}
        onSnapToItem={(index) => setAdvertiseIndex(index)}
        style={{ borderRadius: 12 }}
        renderItem={({ index }) => {
          const ImageComponent = advertiseBanners[index].image;
          const url = advertiseBanners[index].url;
          return (
            <Pressable className="flex-1 justify-center" onPress={() => handleImagePress(url)}>
              {/* SVG 이미지 렌더링 */}

              <ImageComponent width={width - 32} height={width / 2} />
            </Pressable>
          );
        }}
      />

      <View className="absolute bottom-2 right-[10px] flex-row items-center justify-center rounded-[48px] bg-[#323232] px-2 py-[2px] opacity-70">
        <Text className="font-semibold text-white">{advertiseIndex + 1}</Text>
        <Text className="font-semibold text-[#BCBCBC]"> / 2</Text>
      </View>
    </View>
  );
};

export default AdvertiseBannerComponent;
