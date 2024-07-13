import { useState, useEffect } from "react";
import DeviceInfo from "react-native-device-info";

export const useIsOldiPhone = () => {
    const [isOldiPhone, setIsOldiPhone] = useState(false);
    
    useEffect(() => {
        const checkDevice = async () => {
          const model = await DeviceInfo.getModel();
          // iPhone X 이하 모델 체크
          const oldModels = [
            'iPhone 6',
            'iPhone 6 Plus',
            'iPhone 6s',
            'iPhone 6s Plus',
            'iPhone 7',
            'iPhone 7 Plus',
            'iPhone 8',
            'iPhone 8 Plus',
            'iPhone SE',
          ];
          setIsOldiPhone(oldModels.includes(model));
        };
    
        checkDevice();
      }, []);
    
    return isOldiPhone;
}