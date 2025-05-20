import request from 'supertest';
import app from '../src/app';
import jwt from 'jsonwebtoken';

describe('Auth API', () => {

  describe('POST /login', () => {

    it('should return a token with valid credentials', async () => {
      // Simula una petición POST con usuario y contraseña válidos.
      const res = await request(app)
        .post('/api/login')
        .send({ username: 'admin', password: 'password123' });

      expect(res.statusCode).toBe(200); // Espera un código de estado 200 (OK).
      expect(res.body).toHaveProperty('token'); 

      // Verifica el token JWT usando la clave secreta del entorno.
      const decoded = jwt.verify(res.body.token, process.env.SECRET_KEY as string);

      expect((decoded as any).username).toBe('admin');
    });

    // Devolver 401 con credenciales inválidas.
    it('should return 401 with invalid credentials', async () => {

      const res = await request(app)
        .post('/api/login')
        .send({ username: 'admin', password: 'wrongpassword' });

      // Afirmaciones:
      expect(res.statusCode).toBe(401); // Espera un código de estado 401 (No autorizado).
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
  // Prueba de la ruta protegida con middleware.
  describe('GET /protected-route (middleware)', () => {
    let token: string; 

    // Hook: Se ejecuta una vez antes de todas las pruebas en este bloque.
    beforeAll(async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ username: 'admin', password: 'password123' });

      token = res.body.token; // Almacena el token obtenido.
    });

    // Permitir el acceso con un token válido.
    it('should allow access with valid token', async () => {

      const res = await request(app)
        .get('/api/employees')
        .set('Authorization', `Bearer ${token}`);


      expect(res.statusCode).not.toBe(401); 
    });

    // Debería denegar el acceso sin token.
    it('should deny access without token', async () => {
      const res = await request(app)
        .get('/api/employees');


      expect(res.statusCode).toBe(401); 
    });

    // Denegar el acceso con un token inválido.
    it('should deny access with invalid token', async () => {
      const res = await request(app)
        .get('/api/employees')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toBe(403); // Espera un código de estado 403 (Prohibido).
    });
  });
});