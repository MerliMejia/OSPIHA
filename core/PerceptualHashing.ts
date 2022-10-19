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

export const DeleteImageFile = (path:string):boolean =>{
    throw Error("NOT IMPLEMENTED YET")
}