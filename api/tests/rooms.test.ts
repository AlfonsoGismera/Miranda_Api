import request from 'supertest';
import app from '../src/app';

interface Room {
  roomId: string;
  roomName: string;
  bedType: string;
  roomFloor: string;
  facilities: string[];
  rate: string;
  status: string;
  image: string;
}

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ username: 'admin', password: 'password123' });
  token = res.body.token;
});

describe('Rooms API', () => {
  it('should require authentication for GET /api/rooms', async () => {
    const res = await request(app).get('/api/rooms');
    expect(res.status).toBe(401);
  });

  it('should return list of rooms with valid token', async () => {
    const res = await request(app)
      .get('/api/rooms')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new room', async () => {
    const newRoom: Room = {
      roomId: 'R999',
      roomName: 'Test Room',
      bedType: 'Queen',
      roomFloor: '1',
      facilities: ['Wi-Fi', 'TV'],
      rate: '$99/Night',
      status: 'Available',
      image: 'https://example.com/room.jpg'
    };
    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send(newRoom);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newRoom);
  });

  it('should get a room by ID', async () => {
    // First create
    const roomData = {
      roomId: 'R998',
      roomName: 'Lookup Room',
      bedType: 'King',
      roomFloor: '2',
      facilities: ['AC'],
      rate: '$150/Night',
      status: 'Booked',
      image: 'https://example.com/lookup-room.jpg'
    };
    await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send(roomData);

    const res = await request(app)
      .get(`/api/rooms/${roomData.roomId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(roomData);
  });
});
