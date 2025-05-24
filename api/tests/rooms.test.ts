
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
let createdId: string;

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

  it('should create, retrieve, delete and confirm deletion of a room', async () => {
    createdId = 'R' + Date.now();
    const newRoom: Room = {
      roomId: createdId,
      roomName: 'Test Room',
      bedType: 'Queen',
      roomFloor: '1',
      facilities: ['Wi-Fi', 'TV'],
      rate: '$99/Night',
      status: 'Available',
      image: 'https://example.com/room.jpg'
    };


    const createRes = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send(newRoom);
    expect(createRes.status).toBe(201);
    expect(createRes.body).toMatchObject(newRoom);


    const listRes = await request(app)
      .get('/api/rooms')
      .set('Authorization', `Bearer ${token}`);
    expect(listRes.body.some((r: any) => r.roomId === createdId)).toBe(true);


    const getRes = await request(app)
      .get(`/api/rooms/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body).toMatchObject(newRoom);

    const delRes = await request(app)
      .delete(`/api/rooms/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body).toEqual({ id: createdId });
    

    const afterDelRes = await request(app)
      .get('/api/rooms')
      .set('Authorization', `Bearer ${token}`);
    expect(afterDelRes.body.some((r: any) => r.roomId === createdId)).toBe(false);
  });
});
