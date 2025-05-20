// src/controllers/authController.ts
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const HARD_USER = { username: 'admin', password: 'password123' };

import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (username === HARD_USER.username && password === HARD_USER.password) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
};
