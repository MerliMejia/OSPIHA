import { Image } from '@canvas/image';

export const Hash = (imgPath: string) => {
  return imgPath;
};

export const HexToBin = (hex: string): string | false => {
  return 'NOT IMPLEMENTED YET';
};

export const GetImgFromFile = async (
  path: string
): Promise<Image | undefined> => {
  return new Image();
};

export const DeleteImageFile = (path: string): boolean => {
  throw Error('NOT IMPLEMENTED YET');
};

export const CalculateSimilarity = (img1: string, img2: string) => {
  let similarity = 0;
  const hash1: string = Hash(img1);
  const hash2: string = Hash(img2);
  const hash1Array = hash1.split('');
  hash1Array.forEach((bit, index) => {
    hash2[index] === bit ? similarity++ : null;
  });
  return (similarity / hash1.length) * 100;
};
