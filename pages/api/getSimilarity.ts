import { NextApiRequest, NextApiResponse } from 'next';
import {
  CalculateSimilarity,
  DeleteImageFile
} from '../../core/PerceptualHashing';
import {
  GetFilePathFromClientUpload,
  MakeCannyEdgeDetection
} from '../../utils/helpers';
import { ApiResponse } from '../../utils/interfaces';

type IResponse = ApiResponse<{ similarity: number }>;

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  //Getting file paths
  const filePaths: string[] = (await GetFilePathFromClientUpload(
    req,
    false
  )) as string[];

  filePaths.forEach(async (filePath) => {
    //Converting image to lines only.
    await MakeCannyEdgeDetection(filePath);
  });

  //Calculate similarity based on Hamming Distance.
  const similarity = await CalculateSimilarity(filePaths[0], filePaths[1]);

  filePaths.forEach((filePath) => {
    DeleteImageFile(filePath);
  });

  res.send({ data: { similarity } });
}
