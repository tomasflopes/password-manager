import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import CryptoJS, { AES } from 'crypto-js';

const { password: Password } = new PrismaClient();

import DecodeJWTToken from '../utils/DecodeJWTToken';
import IOptions from '../types/IOptions';
import generatePassword from '../utils/generatePassword';

interface IPasswordRequest {
  service: string;
  options: IOptions;
}

export default {
  async index(request: Request, response: Response) {
    const id = await DecodeJWTToken(request);

    if (!id) return response.status(401).json({ error: 'Token not provided' });

    const passwords = await Password.findMany({
      where: { user_id: String(id) }
    });

    console.log(passwords);

    const decryptedPasswords = passwords.map(
      ({ id, password_hash, service }) => {
        return {
          id,
          service,
          password: AES.decrypt(
            password_hash,
            process.env.SECRET_PASSPHRASE || 'SECRET_PASSPHRASE'
          ).toString(CryptoJS.enc.Utf8)
        };
      }
    );

    return response.json(decryptedPasswords);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const password = await Password.findUnique({
      where: { id }
    });

    if (!password)
      return response.status(404).json({ error: 'Password not found' });

    const decryptedPassword = AES.decrypt(
      password.password_hash,
      process.env.SECRET_PASSPHRASE || 'SECRET_PASSPHRASE'
    ).toString(CryptoJS.enc.Utf8);

    return response.json(decryptedPassword);
  },

  async store(request: Request<{}, {}, IPasswordRequest>, response: Response) {
    const id = await DecodeJWTToken(request);

    if (!id) return response.status(401).json({ error: 'Token not provided' });

    const { service, options } = request.body;

    const password = generatePassword(options);

    console.log(password);

    const passwordHash = AES.encrypt(
      password,
      process.env.SECRET_PASSPHRASE || 'SECRET_PASSPHRASE'
    ).toString();

    const newPassword = await Password.create({
      data: {
        id: uuid(),
        user_id: String(id),
        service,
        password_hash: passwordHash
      }
    });

    return response.status(201).json(newPassword);
  },

  async update(request: Request, response: Response) {
    const userId = await DecodeJWTToken(request);
    const { id } = request.params;

    const password = await Password.findUnique({
      where: { id }
    });

    if (!password)
      return response.status(404).json({ error: 'Password not found' });

    if (password.user_id !== userId)
      return response.status(401).json({ error: 'Unauthorized' });

    if (!password)
      return response.status(404).json({ error: 'Password not found' });

    const { service, options } = request.body;

    if (!options) {
      const updatedPassword = await Password.update({
        where: { id },
        data: {
          service: service || password.service
        }
      });

      return response.status(204).json(updatedPassword);
    }

    const passwordHash = AES.encrypt(
      generatePassword(options),
      process.env.SECRET_PASSPHRASE || 'SECRET_PASSPHRASE'
    ).toString();

    const updatedPassword = await Password.update({
      where: { id },
      data: {
        service: service || password.service,
        password_hash: passwordHash
      }
    });

    return response.status(204).json(updatedPassword);
  },

  async delete(request: Request, response: Response) {
    const userId = await DecodeJWTToken(request);
    const { id } = request.params;

    const password = await Password.findUnique({
      where: { id }
    });

    if (!password)
      return response.status(404).json({ error: 'Password not found' });

    if (password.user_id !== userId)
      return response.status(401).json({ error: 'Unauthorized' });

    const deletedPassword = await Password.delete({
      where: { id }
    });

    return response.json(deletedPassword);
  }
};
