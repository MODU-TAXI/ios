import { Linking } from 'react-native';

export const payWithToss = async (
  bank: string,
  accountNo: string,
  totalPrice: number,
): Promise<void> => {
  await Linking.openURL(
    `supertoss://send?bank=${bank}&accountNo=${accountNo}&origin=linkgen&amount=${totalPrice}`,
  );
};
