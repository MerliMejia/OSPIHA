import { Hash } from './PerceptualHashing';
import * as frisby from 'frisby';

jest.setTimeout(60000)

describe('Perceptual Hashing', () => {
  it('Tes1', () => {
    const t = Hash('T');
    expect(t).toBe('T');
  });
  it('Test2', (done) => {
    frisby.get("http://httpbin.org/status/418").expect("status", 418).then((v)=>{
        done()
    }).catch((er)=>{
        done(er)
    })
  });
});
