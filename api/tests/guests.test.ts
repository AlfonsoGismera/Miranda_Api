import request from 'supertest';
import app from '../src/app';

interface Guest {
  guest: string;
  reservationId: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  roomType: string;
  status: string;
  email: string;
  phone: string;
  image: string;
}

let token: string;
let createdId: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ username: 'admin', password: 'password123' });
  token = res.body.token;
});

describe('Guests API', () => {
  it('should require authentication for GET /api/guests', async () => {
    const res = await request(app).get('/api/guests');
    expect(res.status).toBe(401);
  });

  it('should return list of guests with valid token', async () => {
    const res = await request(app)
      .get('/api/guests')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create, retrieve, delete and confirm deletion of a guest', async () => {
    createdId = 'U' + Date.now();
    const newGuest: Guest = {
      guest: 'Test Guest',
      reservationId: createdId,
      orderDate: new Date().toISOString(),
      checkIn: new Date().toISOString(),
      checkOut: new Date().toISOString(),
      specialRequest: 'None',
      roomType: 'Test Room',
      status: 'Pending',
      email: 'test.guest@example.com',
      phone: '+123456789',
      image: 'https://example.com/image.jpg',
    };
    const createRes = await request(app)
      .post('/api/guests')
      .set('Authorization', `Bearer ${token}`)
      .send(newGuest);
    expect(createRes.status).toBe(201);
    expect(createRes.body).toMatchObject(newGuest);

  
    const listRes = await request(app)
      .get('/api/guests')
      .set('Authorization', `Bearer ${token}`);
    expect(listRes.body.some((g: any) => g.reservationId === createdId)).toBe(true);


    const getRes = await request(app)
      .get(`/api/guests/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body).toMatchObject(newGuest);


    const delRes = await request(app)
      .delete(`/api/guests/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body).toEqual({ id: createdId });


    const afterDelRes = await request(app)
      .get('/api/guests')
      .set('Authorization', `Bearer ${token}`);
    expect(afterDelRes.body.some((g: any) => g.reservationId === createdId)).toBe(false);
  });
});
