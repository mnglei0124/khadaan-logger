import { NextApiRequest, NextApiResponse } from 'next';
import { setTokenCookie } from '../../lib/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token, rememberMe } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    setTokenCookie(token, res, rememberMe);
    return res.status(200).json({ message: 'Logged in successfully' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
