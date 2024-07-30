import { Linking } from 'react-native';

export const payWithToss = async (
  bank: string,
  accountNo: string,
  totalPrice: number,
): Promise<void> => {
  try {
    await Linking.openURL(
      `supertoss://send?bank=${bank}&accountNo=${accountNo}&origin=linkgen&amount=${totalPrice}`,
    );
  } catch (error) {
    // 없다면 토스 설치 페이지로 이동
    await Linking.openURL('https://apps.apple.com/kr/app/%ED%86%A0%EC%8A%A4/id839333328');
  }
};
