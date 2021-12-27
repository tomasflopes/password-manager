import { Request, response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenInterface {
  _id: string;
  iat: number;
}

export default async (request: Request) => {
  const authHeader = request.headers.authorization as string;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as TokenInterface;

  return decoded._id;
};
