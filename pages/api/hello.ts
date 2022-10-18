// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

/**
 * @swagger
 * /api/hello:
 *  get:
 *    description: Returns an object with the name John Doe
 *    responses:
 *      200:
 *        description: Object with the name John Doe
 *        content:
 *          application/json:
 *            example: { name: 'John Doe' }
 *          
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
