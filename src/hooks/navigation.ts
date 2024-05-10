import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { LoginStackParamList } from '@type/ParamLists';

const useToRoomDetailScreen = (roomId: number) => {
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();
  navigation.navigate('RoomDetailScreen', { roomId: roomId });
};
