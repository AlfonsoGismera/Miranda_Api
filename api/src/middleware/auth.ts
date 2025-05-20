// src/middleware/auth.ts
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token in Authorization header (Bearer <token>)
 */
export const checkToken: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ message: 'Malformed token' });
    return;
  }
  const token = parts[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};