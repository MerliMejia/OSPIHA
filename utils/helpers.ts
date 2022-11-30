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

const RenameFile = (file: File): string => {
  const dirPath = file.filepath.replace(file.newFilename, '');
  const newFileName = file.originalFilename;
  fs.renameSync(file.filepath, dirPath + newFileName);
  return dirPath + newFileName;
};

export const GetFilePathFromClientUpload = async (
  req: NextApiRequest,
  single: boolean = true
) => {
  return new Promise<string | string[]>((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      if (single === true) {
        let file = (files.images as File[])[0];
        resolve(RenameFile(file));
      } else {
        const uploadedFiles = files.images as File[];
        const paths: string[] = [];
        uploadedFiles.forEach((file) => {
          paths.push(RenameFile(file));
        });
        resolve(paths);
      }
    });
  });
};
