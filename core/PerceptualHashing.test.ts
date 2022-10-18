import { HexToBin } from './PerceptualHashing';

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
});
