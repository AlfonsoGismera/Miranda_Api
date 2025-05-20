import request from 'supertest';
import app from '../src/app';
import jwt from 'jsonwebtoken';

describe('Auth API', () => {
  describe('POST /login', () => {
    it('should return a token with valid credentials', async () => {
      const res = await request(app)
        .post('/api/login')  // <- corregido aquí
        .send({ username: 'admin', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');

      const decoded = jwt.verify(res.body.token, process.env.SECRET_KEY as string);
      expect((decoded as any).username).toBe('admin');
    });

    it('should return 401 with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/login')  // <- corregido aquí
        .send({ username: 'admin', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('GET /protected-route (middleware)', () => {
    let token: string;

    beforeAll(async () => {
      const res = await request(app)
        .post('/api/login')  // <- corregido aquí
        .send({ username: 'admin', password: 'password123' });

      token = res.body.token;
    });

    it('should allow access with valid token', async () => {
      const res = await request(app)
        .get('/api/employees')  // <- corregido aquí
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).not.toBe(401);
    });

    it('should deny access without token', async () => {
      const res = await request(app)
        .get('/api/employees');  // <- corregido aquí

      expect(res.statusCode).toBe(401);
    });

    it('should deny access with invalid token', async () => {
      const res = await request(app)
        .get('/api/employees')  // <- corregido aquí
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toBe(403);
    });
  });
});
