import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '../../lib/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    removeTokenCookie(res);
    return res.status(200).json({ message: 'Logged out successfully' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
