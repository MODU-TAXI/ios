import {
  Asset,
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import { uploadImage } from '@server/api/s3';
import { s3Response } from '@server/responseTypes/s3';

// 이미지 업로드
export const handleUpload = async (image: Asset): Promise<s3Response> => {
  const localUri = image.uri;

  // 이미지 경로가 존재하지 않을때 에러 표사
  if (!localUri) {
    throw new Error('잘못된 이미지 경로입니다!');
  }

  const uriPath = localUri.split('//').pop() ?? '';
  const imageName = localUri.split('/').pop() ?? 'unknown';

  const formData = new FormData();
  formData.append('file', {
    uri: uriPath,
    type: image.type,
    name: imageName,
  });

  return await uploadImage(formData);
};

// 카메라로 사진 선택
export const openCamera = async (): Promise<Asset | null> => {
  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
  };

  const result = await launchCamera(options);

  if (result.didCancel) {
    return null;
  }

  if (result?.assets) {
    await handleUpload(result.assets[0]);
    return result.assets[0];
  }

  return null;
};

// 앨범에서 사진 선택
export const openAlbum = async (): Promise<Asset | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  const result = await launchImageLibrary(options);

  if (result.didCancel) {
    return null;
  }

  if (result?.assets) {
    await handleUpload(result.assets[0]);
    return result.assets[0];
  }

  return null;
};
