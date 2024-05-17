import React from "react";
import { View, Text } from "react-native";

import PlusCircleFillSvg from '@assets/images/Map/plusCircleFill.svg'

const CreateRoomButtonComponent = () => {
    return (
        <View className="bg-transparent">
            <View className="flex h-fit w-fit flex-row items-center justify-center rounded-full bg-main px-6 py-2 shadow-lg">
                <PlusCircleFillSvg width={24} height={24} />
                <Text className="pl-1 text-sm font-semibold text-white">택시팟 생성하기</Text>
            </View>
        </View>
    )
}

export default CreateRoomButtonComponent;