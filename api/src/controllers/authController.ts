// src/controllers/authController.ts
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userService } from '../services/userService';
import { IUser } from '../models/User';

/**
 * POST /api/login
 * Body: { username, password }
 * Responde con { token } o 401 si falla.
 */
export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body as { username: string; password: string };

  // 1) Busca usuario en Mongo
  const user: IUser | null = await userService.fetchOneByUsername(username);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // 2) Compara password con bcrypt
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // 3) Genera JWT
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.SECRET_KEY as string,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
