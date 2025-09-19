import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

const TOKEN_NAME = 'firebaseToken';
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30; // 30 days

export const setTokenCookie = (token: string, res: NextApiResponse, rememberMe: boolean = false) => {
  const maxAge = rememberMe ? THIRTY_DAYS_IN_SECONDS : undefined;
  const expires = rememberMe ? new Date(Date.now() + THIRTY_DAYS_IN_SECONDS * 1000) : undefined;

  const cookie = serialize(TOKEN_NAME, token, {
    maxAge,
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
};

export const removeTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
};
