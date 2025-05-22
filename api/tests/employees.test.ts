import request from 'supertest';
import app from '../src/app';

let token: string;
let createdId: string;

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

  it('should create and then delete a new employee', async () => {
    // Generamos un ID único
    createdId = 'EMP' + Date.now();

    const newEmp = {
      employeeId: createdId,
      name: 'Test User',
      image: '',
      jobDesk: 'Tester',
      schedule: ['Mon'],
      hireDate: new Date().toISOString(),
      contact: '000',
      status: 'Active'
    };

    // Creamos
    const createRes = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .send(newEmp);
    expect(createRes.status).toBe(201);
    expect(createRes.body).toMatchObject(newEmp);

    // Verificamos que ahora existe 
    const listRes = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(listRes.body.some((e: any) => e.employeeId === createdId)).toBe(true);

    // Borramos
    const delRes = await request(app)
      .delete(`/api/employees/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body).toEqual({ id: createdId });

    // Y finalmente comprobamos que ya no aparece
    const afterDelRes = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${token}`);
    expect(afterDelRes.body.some((e: any) => e.employeeId === createdId)).toBe(false);
  });
});
