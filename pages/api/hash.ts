import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../utils/interfaces';
import { DeleteImageFile, Hash } from '../../core/PerceptualHashing';
import {
  GetFilePathFromClientUpload,
  MakeCannyEdgeDetection
} from '../../utils/helpers';

type IResponse = ApiResponse<{ hash: string }>;

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  //Getting file path
  const filePath = await GetFilePathFromClientUpload(req);

  //Converting image to lines only.
  await MakeCannyEdgeDetection(filePath);

  //Obtaining the binary hash of the new image.
  const hash = await Hash(filePath);

  //Deleting the image once we have the hash.
  DeleteImageFile(filePath);

  //Error handling and sending it to the client.
  if (hash === false) {
    res
      .status(400)
      .send({ error: { message: 'ERROR CONVERTING HEX TO BIN.' } });
  } else if (hash === undefined) {
    res.status(400).send({ error: { message: 'ERROR READING THE IMAGE.' } });
  } else {
    res.send({ data: { hash: hash } });
  }
}
