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

  it('should create a new guest', async () => {
    const newGuest: Guest = {
      guest: 'Test Guest',
      reservationId: 'U999',
      orderDate: new Date().toISOString(),
      checkIn: new Date().toISOString(),
      checkOut: new Date().toISOString(),
      specialRequest: 'None',
      roomType: 'Test Room',
      status: 'Pending',
      email: 'test.guest@example.com',
      phone: '+123456789',
      image: 'https://example.com/image.jpg'
    };
    const res = await request(app)
      .post('/api/guests')
      .set('Authorization', `Bearer ${token}`)
      .send(newGuest);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newGuest);
  });

  it('should get a guest by ID', async () => {
    // First create
    const guestData = {
      guest: 'Lookup Guest',
      reservationId: 'U998',
      orderDate: new Date().toISOString(),
      checkIn: new Date().toISOString(),
      checkOut: new Date().toISOString(),
      specialRequest: '',
      roomType: 'Test Room',
      status: 'Booked',
      email: 'lookup.guest@example.com',
      phone: '+987654321',
      image: 'https://example.com/lookup.jpg'
    };
    await request(app)
      .post('/api/guests')
      .set('Authorization', `Bearer ${token}`)
      .send(guestData);

    const res = await request(app)
      .get(`/api/guests/${guestData.reservationId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(guestData);
  });
});
