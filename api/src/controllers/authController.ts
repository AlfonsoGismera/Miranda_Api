import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const HARD_USER = { username: 'admin', password: 'password123' };

export const login: RequestHandler = (req, res) => {
  const { username, password } = req.body;
  if (username === HARD_USER.username && password === HARD_USER.password) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
    res.json({ token });
    return;
  }
  res.status(401).json({ message: 'Invalid credentials' });
};