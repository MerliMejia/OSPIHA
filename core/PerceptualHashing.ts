import { getImageData, Image, imageFromBuffer } from '@canvas/image';
import { bmvbhash } from 'blockhash-core';
import fs from 'fs';

export const Hash = async (imgPath: string) => {
  try {
    let data = await GetImgFromFile(imgPath);
    const hash = bmvbhash(getImageData(data!)!, 8);
    return HexToBin(hash);
  } catch (error) {
    console.log(error);
  }
};

export const HexToBin = (hex: string): string | false => {
  const regex = new RegExp(/^[0-9a-fA-F]+$/);
  if (!regex.test(hex)) {
    return false;
  }
  const hexBinLookup: any = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    a: '1010',
    b: '1011',
    c: '1100',
    d: '1101',
    e: '1110',
    f: '1111',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111'
  };
  let result = '';
  for (let i = 0; i < hex.length; i++) {
    result += hexBinLookup[hex[i]];
  }
  return result;
};

export const GetImgFromFile = async (
  path: string
): Promise<Image | undefined> => {
  if (path.length === 0) return undefined;
  const imgRegex = /\.(jpg|jpeg|png|gif)$/i;
  if (!imgRegex.test(path)) {
    return undefined;
  }
  let data: Buffer | undefined;

  try {
    data = fs.readFileSync(path);
  } catch (error) {
    return undefined;
  }

  return imageFromBuffer(data);
};

export const DeleteImageFile = (path: string): boolean => {
  if (path.length === 0) return false;
  if (!fs.existsSync(path)) return false;

  try {
    fs.unlinkSync(path);
  } catch (error) {
    return false;
  }

  return true;
};

export const CalculateSimilarity = async (img1: string, img2: string) => {
  let similarity = 0;
  const hash1 = await Hash(img1);
  const hash2 = await Hash(img2);
  const hash1Array = (hash1! as string).split('');
  hash1Array.forEach((bit, index) => {
    (hash2! as string)[index] === bit ? similarity++ : null;
  });
  const result = (similarity / (hash1! as string).length) * 100
  console.log("Similarity: ", result)
  return result;
};
