import { spawn } from 'child_process';
import { NextApiRequest } from 'next';
import path from 'path';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';

export const MakeCannyEdgeDetection = async (
  imgPath: string
): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [
      path.resolve('./core/Python/OpenCV.py'),
      imgPath
    ]);
    python.on('close', (code) => {
      if (code === null) {
        reject(null);
      }
      resolve(code);
    });
  });
};

export const GetFilePathFromClientUpload = async (req: NextApiRequest) => {
  return new Promise<string>((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      let file = (files.file as File[])[0];
      const dirPath = file.filepath.replace(file.newFilename, '');
      const newFileName = file.originalFilename;
      fs.renameSync(file.filepath, dirPath + newFileName);
      resolve(dirPath + newFileName);
    });
  });
};
