import {
  HexToBin,
  GetImgFromFile,
  DeleteImageFile,
  CalculateSimilarity
} from './PerceptualHashing';
import { Image } from '@canvas/image';
import path from 'path';
import fs from 'fs';

describe('Perceptual Hashing', () => {
  describe('Hex To Bin Function', () => {
    it('Should return the binary version of a given hex value', () => {
      const hex =
        '68ac473ca71f9dfe63b3a95374cf1212b349108791591eb1c0d787c6dcf07d663b5df94393668a58';
      const result = HexToBin(hex);
      expect(result).toBe(
        '01101000101011000100011100111100101001110001111110011101111111100110001110110011101010010101001101110100110011110001001000010010101100110100100100010000100001111001000101011001000111101011000111000000110101111000011111000110110111001111000001111101011001100011101101011101111110010100001110010011011001101000101001011000'
      );
    });

    it('Should fail if the input is empty', () => {
      expect(HexToBin('')).toBeFalsy();
    });
    it('Should fail if the input is an invalid hex value', () => {
      expect(HexToBin('Merli Mejia')).toBeFalsy();
    });
  });

  describe('Get Imgage From File', () => {
    it('Should return a valid Image object from a file', (done) => {
      GetImgFromFile(path.resolve('./test-files/testimg.png'))
        .then((res) => {
          expect(res).toBeInstanceOf(Image);
          expect(res?.width).toBeGreaterThan(0);
          done();
        })
        .catch((rej) => done(rej));
    });
    it('Should fail on with empty path', (done) => {
      GetImgFromFile('')
        .then((res) => {
          expect(res).toBeUndefined();
          done();
        })
        .catch((rej) => done(rej));
    });
    it("Should fail if file doesn't exist", (done) => {
      GetImgFromFile(path.resolve('./test-files/testimg-not.jpeg'))
        .then((res) => {
          expect(res).toBeUndefined();
          done();
        })
        .catch((rej) => done(rej));
    });
    it('Should fail if file is not an image', (done) => {
      GetImgFromFile(path.resolve('./test-files/test.txt'))
        .then((res) => {
          expect(res).toBeUndefined();
          done();
        })
        .catch((rej) => done(rej));
    });
  });

  describe('Delete image file', () => {
    const filePath = path.resolve('./test-files/delete-test.txt');
    fs.writeFileSync(filePath, 'TEST');
    it('Should delete the file and return true', () => {
      expect(DeleteImageFile(filePath)).toBeTruthy();
    });
    it('Should fail at deleting the file when empty file path', () => {
      expect(DeleteImageFile('')).toBeFalsy();
    });
    it("Should fail at deleting the file when file doesn't exist", () => {
      expect(DeleteImageFile('merli')).toBeFalsy();
    });
  });

  describe('Calculate Similarity', () => {
    const img1 = path.resolve('./test-files/testimg.png');
    const img2 = path.resolve('./test-files/testimg2.png');
    const img3 = path.resolve('./test-files/testimg3.png');
    it('Should return a similarity % higher than 90% with 2 exact islands', (done) => {
      CalculateSimilarity(img1, img2)
        .then((v) => {
          expect(v).toBeGreaterThan(80);
          done();
        })
        .catch((e) => done(e));
    });
    it('Should return a similarity % with less than 80% with 2 different islands', (done) => {
      CalculateSimilarity(img1, img3)
        .then((v) => {
          expect(v).toBeLessThan(80);
          done();
        })
        .catch((e) => done(e));
    });
  });
});
