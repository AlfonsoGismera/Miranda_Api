import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Hardcoded user credentials
const HARD_USER = { username: 'admin', password: 'password123' };

export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (username === HARD_USER.username && password === HARD_USER.password) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
}
