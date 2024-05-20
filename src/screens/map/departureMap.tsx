import React from "react";
import { Text, View } from "react-native";

import { DepartureMapScreenProps } from "@type/param/loginStack";

const DepartureMapScreen = ({ route, navigation }: DepartureMapScreenProps) => {
    return (
        <View>
            <Text>
                {route.params.title}
            </Text>
        </View>
    )
}

export default DepartureMapScreen;