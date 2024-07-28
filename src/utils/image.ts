import ImageResizer from '@bam.tech/react-native-image-resizer';
import {
  Asset,
  launchCamera,
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import { uploadImage } from '@server/api/s3';

type ResizedImage = {
  path: string;
  uri: string;
  name: string;
  size: number;
  width: number;
  height: number;
};

// 이미지 리사이징
const resizeImage = async (image: Asset): Promise<ResizedImage | null> => {
  if (image.uri) {
    const resizerImage = await ImageResizer.createResizedImage(
      image.uri,
      360,
      360,
      'JPEG',
      100,
      0,
      null,
      false,
      { onlyScaleDown: true },
    );

    return resizerImage;
  }

  return null;
};

// 이미지 업로드
export const handleUpload = async (image: Asset): Promise<string> => {
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

  const { imageUrl } = await uploadImage(formData);

  return imageUrl;
};

// 카메라로 사진 선택
export const openCamera = async (): Promise<string | null> => {
  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
  };

  const result = await launchCamera(options);

  if (result.didCancel) {
    return null;
  }

  if (result?.assets) {
    // const resizedImage = await resizeImage(result.assets[0]);

    // if (resizedImage) {
    //   const resizedAsset: Asset = {
    //     uri: resizedImage.uri,
    //     type: 'image/jpeg',
    //     fileName: resizedImage.name,
    //     fileSize: resizedImage.size,
    //     width: resizedImage.width,
    //     height: resizedImage.height,
    //   };

    //   return handleUpload(resizedAsset);
    // }

    return handleUpload(result.assets[0]);
  }

  return null;
};

// 앨범에서 사진 선택
export const openAlbum = async (): Promise<string | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  const result = await launchImageLibrary(options);

  if (result.didCancel) {
    return null;
  }

  if (result?.assets) {
    // const resizedImage = await resizeImage(result.assets[0]);

    // if (resizedImage) {
    //   const resizedAsset: Asset = {
    //     uri: resizedImage.uri,
    //     type: 'image/jpeg',
    //     fileName: resizedImage.name,
    //     fileSize: resizedImage.size,
    //     width: resizedImage.width,
    //     height: resizedImage.height,
    //   };

    //   return handleUpload(resizedAsset);
    // }

    return handleUpload(result.assets[0]);
  }

  return null;
};
