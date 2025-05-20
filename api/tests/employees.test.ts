// tests/employees.test.ts
import request from 'supertest';
import app from '../src/app';

let token: string;

beforeAll(async () => {
  const auth = await request(app)
    .post('/api/login')
    .send({ username: 'admin', password: 'password123' });
  token = auth.body.token;
});

describe('Employees API', () => {
  it('should require authentication', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.status).toBe(401);
  });

  it('should return list of employees with valid token', async () => {
    const res = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new employee', async () => {
    const newEmp = {
      employeeId: 'EMP999',
      name: 'Test User',
      image: '',
      jobDesk: 'Tester',
      schedule: ['Mon'],
      hireDate: '2025-05-20',
      contact: '000',
      status: 'Active'
    };
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send(newEmp);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newEmp);
  });
});
