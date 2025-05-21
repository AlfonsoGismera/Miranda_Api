import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware para verificar JWT token  (Bearer <token>)
 */
export const checkToken: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ message: 'Malformed token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
