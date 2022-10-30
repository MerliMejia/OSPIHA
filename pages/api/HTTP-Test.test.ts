import { formData, get, post } from 'frisby';
import path from 'path';
import fs from 'fs';

jest.setTimeout(60000);
describe('HTTP Test', () => {
  const BASE_URL: string = 'http://host.docker.internal:3000/api/';
  it('Hello', (done) => {
    get(BASE_URL + 'hello')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.json).toHaveProperty('name');
        expect(res.json.name).toBe('John Doe');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  describe('Get Hash Endpoint', () => {
    it('Should send a file and return the hash string', (done) => {
      let data: FormData = formData();
      let file = fs.readFileSync(path.resolve('./test-files/cat.png'));
      data.append('file', file.toString());
      post(BASE_URL + 'hash', { body: data })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.json).toHaveProperty('data');
          expect(res.json.data.hash.length).toBeGreaterThan(0);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('Should not send a file and return an error', (done) => {
      let data: FormData = formData();
      post(BASE_URL + 'hash', { body: data })
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('Should send a file that is not an image and return an error', (done) => {
      let data: FormData = formData();
      let file = fs.readFileSync(path.resolve('./test-files/test.txt'));
      data.append('file', file.toString());
      post(BASE_URL + 'hash', { body: data })
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('Should send a file that is larger than 10MG and return an error', (done) => {
      let data: FormData = formData();
      let file = fs.readFileSync(path.resolve('./test-files/chicken.png'));
      data.append('file', file.toString());
      post(BASE_URL + 'hash', { body: data })
        .then((res) => {
          expect(res.status).toBe(400);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
