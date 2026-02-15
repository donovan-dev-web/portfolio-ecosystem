const request = require('supertest');
const app = require('../../app');
const ProjectType = require('../../models/ProjectTypeModel');
const Technology = require('../../models/TechnologyModel');
const ProgrammingLanguage = require('../../models/ProgrammingLanguageModel');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  const user = await User.create({
    email: 'project@test.com',
    password: 'Password123',
  });

  token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
});

describe('Projects API - Complete CRUD', () => {
  let projectType, technology, language;

  const createProject = async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Project',
        projectType: projectType._id,
        technologies: [technology._id],
        languages: [language._id],
        shortDescription: 'Short description',
        coverImage: 'cover.jpg',
        stack: ['React', 'Node.js'],
        presentation: {
          description: 'desc',
          context: 'ctx',
          objectives: 'obj',
          skills: 'skills',
          results: 'results',
          improvements: 'improvements',
        },
        gallery: [
          {
            desktopUrl: 'desk.jpg',
            mobileUrl: 'mob.jpg',
            alt: 'alt',
            order: 1,
          },
        ],
        githubUrl: 'https://github.com/test',
        isLive: true,
        liveUrl: 'https://live.com',
      });

    return res.body._id;
  };

  beforeEach(async () => {
    projectType = await ProjectType.create({
      name: 'Web',
      icon: 'web-icon.png',
    });

    technology = await Technology.create({
      name: 'React',
      icon: 'react-icon.png',
    });

    language = await ProgrammingLanguage.create({
      name: 'JavaScript',
      icon: 'js-icon.png',
    });
  });

  it('POST /projects → should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Project',
        projectType: projectType._id,
        technologies: [technology._id],
        languages: [language._id],
        shortDescription: 'Short description',
        coverImage: 'cover.jpg',
        stack: ['React', 'Node.js'],
        presentation: {
          description: 'desc',
          context: 'ctx',
          objectives: 'obj',
          skills: 'skills',
          results: 'results',
          improvements: 'improvements',
        },
        gallery: [
          {
            desktopUrl: 'desk.jpg',
            mobileUrl: 'mob.jpg',
            alt: 'alt',
            order: 1,
          },
        ],
        githubUrl: 'https://github.com/test',
        isLive: true,
        liveUrl: 'https://live.com',
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Project');
  });

  it('GET /projects → should retrieve all projects', async () => {
    await createProject();

    const res = await request(app).get('/api/projects');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('GET /projects/:id → should retrieve project by id', async () => {
    const projectId = await createProject();

    const res = await request(app).get(`/api/projects/${projectId}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Test Project');
  });

  it('PUT /projects/:id → should update project', async () => {
    const projectId = await createProject();

    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Project' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Project');
  });

  it('DELETE /projects/:id → should delete project', async () => {
    const projectId = await createProject();

    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const check = await request(app).get(`/api/projects/${projectId}`);
    expect(check.status).toBe(404);
  });
});
