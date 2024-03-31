import ButtonComponent from '@components/Button';
import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import NaverMapView from 'react-native-nmap';
import { ScrollView } from 'react-native-gesture-handler';
import StartCircle from '@assets/images/Match/StartCircle.svg';
import EndCircle from '@assets/images/Match/EndCircle.svg';
import ParticipateUserComponent from '@components/ParticipateUser';
import WaitUserComponent from '@components/WaitUser';
import RoomTagComponent from '@components/RoomDigest/RoomTag';
import HeaderComponent from '@components/Header';

const MatchScreen = () => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  // 다음으로
  const toNext = useCallback(async (): Promise<void> => {
    console.log('ok');
  }, []);

  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const P1 = { latitude: 37.565051, longitude: 126.978567 };
  const P2 = { latitude: 37.565383, longitude: 126.976292 };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* 헤더 */}
        <HeaderComponent />

        {/* 카테고리 */}
        <View className="flex-row mt-8">
          <RoomTagComponent
            label="학생인증"
            textColor="text-main"
            bgColor="bg-sub100"
          />

          <RoomTagComponent
            label="여자만"
            textColor="text-gray500"
            bgColor="bg-box"
          />

          <RoomTagComponent
            label="조용히"
            textColor="text-gray500"
            bgColor="bg-box"
          />
        </View>

        {/* 자도 */}
        <View className="w-full h-[200px] mt-2 bg-sub100 rounded">
          <NaverMapView
            style={{ width: '100%', height: '100%' }}
            showsMyLocationButton={true}
            center={{ ...P0, zoom: 16 }}
            onCameraChange={(e) =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
          />
        </View>

        {/* 날짜, 출발지, 도착지 정보  */}
        <View className="mt-8 mb-10 mx-2">
          <View>
            <Text className="text-lg font-medium text-emphasized">
              2024. 03. 25 (월)
            </Text>
          </View>

          <View className="mt-5">
            <View>
              <View className="flex-row items-center">
                <StartCircle />

                <Text className="text-lg text-disabled2 font-normal ml-4">
                  13:35
                </Text>
              </View>
            </View>

            <View className="flex-row ml-[6px] my-2">
              <View className="w-[1px] h-[46px] bg-main" />

              <Text className="ml-6 text-[20px] font-semibold">
                인하대학교 후문
              </Text>
            </View>

            <View>
              <View className="flex-row items-center">
                <EndCircle />

                <Text className="text-lg text-disabled2 font-normal ml-4">
                  14:00
                </Text>
              </View>

              <Text className="text-[20px] font-semibold ml-8 mt-2">
                주안역
              </Text>
            </View>
          </View>
        </View>

        {/* 점선 */}
        <View className="w-full border-dashed border-[1px] border-gray-200" />

        {/* 방장 */}
        <View className="mt-8">
          <Text className="text-[20px] font-semibold">방장</Text>

          <ParticipateUserComponent
            nickname={'버스를 놓친 사자'}
            temperature={36.5}
            me={true}
          />
        </View>

        {/* 참여 멤버 */}
        <View className="mt-16">
          <Text className="text-[20px] font-semibold">참여멤버</Text>
          <ParticipateUserComponent
            nickname={'졸다가 늦은 판다'}
            temperature={36.5}
            me={false}
          />
          <ParticipateUserComponent
            nickname={'버스가 작은 곰'}
            temperature={36.5}
            me={false}
          />
          <ParticipateUserComponent
            nickname={'숏다리 햄스터'}
            temperature={36.5}
            me={false}
          />
        </View>

        {/* 대기 멤버 */}
        <View className="mt-16">
          <Text className="text-[20px] font-semibold">대기멤버</Text>

          <WaitUserComponent nickname={'남자'} temperature={36.5} />

          <WaitUserComponent nickname={'여자'} temperature={36.5} />
        </View>

        {/* 점선 */}
        <View className="mt-8 w-full border-dashed border-[1px] border-gray-200" />

        {/* 금액 */}
        <View className="mt-8">
          <View className="flex-row justify-between">
            <Text className="text-lg text-disabled2 font-medium">총액</Text>
            <Text className="text-lg text-black font-medium">14,450원</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <Text className="text-lg text-disabled2 font-medium">
              최소인원 매칭시
            </Text>
            <Text className="text-lg text-black font-medium">3,613원</Text>
          </View>
        </View>

        {/* 버튼 */}
        <View className="mt-[120px] mx-6">
          <ButtonComponent
            color={'bg-main'}
            text={'매칭 수정하기'}
            textColor={'white'}
            onPress={toNext}
            disabled={false}
          />
        </View>

        <View className="mt-3 mx-6 mb-10">
          <ButtonComponent
            color={'bg-main'}
            text={'매칭 삭제하기'}
            textColor={'white'}
            onPress={toNext}
            disabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchScreen;
