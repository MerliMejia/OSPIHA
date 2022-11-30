import { NextApiRequest, NextApiResponse } from 'next';
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
) {}
