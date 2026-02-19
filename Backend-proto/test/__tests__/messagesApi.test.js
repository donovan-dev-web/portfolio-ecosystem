const request = require('supertest');
const app = require('../../app');
const User = require('../../models/Users');
const Message = require('../../models/MessagesModels');
const jwt = require('jsonwebtoken');

let token;

beforeEach(async () => {
  // Crée un utilisateur à chaque test
  const user = await User.create({
    email: 'testuser@example.com',
    password: 'Password123',
  });

  token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
});

describe('Messages API - CRUD', () => {
  it('POST /messages → créer un message', async () => {
    const res = await request(app).post('/api/messages').send({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '0612345678',
      content: 'Bonjour, je souhaite vous contacter pour...',
    });

    expect(res.status).toBe(201);
    expect(res.body.data.read).toBe(false);
  });

  it('GET /messages → récupérer tous les messages', async () => {
    await Message.create({
      name: 'Alice',
      email: 'alice@test.com',
      content: 'Test',
      read: false,
    });

    const res = await request(app)
      .get('/api/messages')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].name).toBe('Alice');
  });

  it('GET /messages/:id → récupérer message et marquer lu', async () => {
    const msg = await Message.create({
      name: 'Bob',
      email: 'bob@test.com',
      content: 'Test',
      read: false,
    });

    const res = await request(app)
      .get(`/api/messages/${msg._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(msg._id.toString());
    expect(res.body.read).toBe(true);
    expect(res.body.dateRead).toBeTruthy();
  });

  it('PUT /messages/:id/read → marquer comme lu', async () => {
    const msg = await Message.create({
      name: 'Charlie',
      email: 'charlie@test.com',
      content: 'Test',
      read: false,
    });

    const res = await request(app)
      .put(`/api/messages/${msg._id}/read`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.read).toBe(true);
    expect(res.body.data.dateRead).toBeTruthy();
  });

  it('GET /messages/:id → 404 pour ID inexistant', async () => {
    const res = await request(app)
      .get('/api/messages/63f6c8eab1234567890abcd')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Message non trouvé');
  });

  it('PUT /messages/:id/read → 404 pour ID inexistant', async () => {
    const res = await request(app)
      .put('/api/messages/63f6c8eab1234567890abcd/read')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Message non trouvé');
  });
});
