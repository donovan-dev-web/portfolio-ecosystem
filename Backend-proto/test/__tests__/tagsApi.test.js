const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/Users');
const ProjectType = require('../../models/ProjectTypeModel');
const Technology = require('../../models/TechnologyModel');
const ProgrammingLanguage = require('../../models/ProgrammingLanguageModel');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  // Créer un utilisateur temporaire
  const user = await User.create({
    email: 'test@test.com',
    password: 'Password123',
  });
  token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
});

describe('Tags API - Complete CRUD', () => {
  let projectTypeId, technologyId, languageId;

  it('ProjectTypes → create, get, update, delete', async () => {
    // Create
    let res = await request(app)
      .post('/api/project-types')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Web', icon: 'web-icon.png' });

    expect(res.status).toBe(201);
    projectTypeId = res.body._id;

    // Get all
    res = await request(app).get('/api/project-types');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    // Get by ID
    res = await request(app).get(`/api/project-types/${projectTypeId}`);
    expect(res.status).toBe(200);

    // Update
    res = await request(app)
      .put(`/api/project-types/${projectTypeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Web', icon: 'web-icon.png' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Web');

    // Delete
    res = await request(app)
      .delete(`/api/project-types/${projectTypeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('technologies → create, get, update, delete', async () => {
    // Create
    let res = await request(app)
      .post('/api/technologies')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'React', icon: 'react-icon.png' });
    expect(res.status).toBe(201);
    technologyId = res.body._id;

    // Get all
    res = await request(app).get('/api/technologies');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    // Get by ID
    res = await request(app).get(`/api/technologies/${technologyId}`);
    expect(res.status).toBe(200);

    // Update
    res = await request(app)
      .put(`/api/technologies/${technologyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated React', icon: 'react-icon.png' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated React');

    // Delete
    res = await request(app)
      .delete(`/api/technologies/${technologyId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('ProgrammingLanguages → create, get, update, delete', async () => {
    // Create
    let res = await request(app)
      .post('/api/languages')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'JavaScript', icon: 'js-icon.png' });
    expect(res.status).toBe(201);
    languageId = res.body._id;

    // Get all
    res = await request(app).get('/api/languages');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    // Get by ID
    res = await request(app).get(`/api/languages/${languageId}`);
    expect(res.status).toBe(200);

    // Update
    res = await request(app)
      .put(`/api/languages/${languageId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated JS', icon: 'js-icon.png' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated JS');

    // Delete
    res = await request(app)
      .delete(`/api/languages/${languageId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
