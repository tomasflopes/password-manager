import { Request, Response } from 'express';

import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

const { user } = new PrismaClient();

export default {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const u = await user.findUnique({ where: { email } });

    if (!u) return response.status(404).json({ error: 'User not found' });

    const validPassword = bcrypt.compareSync(password, u.password_hash);

    if (!validPassword)
      return response
        .status(400)
        .json({ message: 'Something went wrong with authentication...' });

    const token = jwt.sign({ _id: u.id }, process.env.TOKEN_SECRET as string);

    return response.status(200).json({
      user: u,
      token
    });
  },

  async store(request: Request, response: Response) {
    const { name, email, password, avatarUrl } = request.body;

    const userExists = await user.findUnique({ where: { email } });

    if (userExists)
      return response.status(400).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 8);

    const u = await user.create({
      data: {
        id: uuid(),
        email,
        name,
        password_hash: passwordHash,
        avatar_url: avatarUrl
      }
    });

    return response.status(201).json({ user: u });
  }
};
