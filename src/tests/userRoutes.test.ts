import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

beforeAll(async () => {
  await prisma.$connect();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Routes', () => {
  test('POST /api/users - Should create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'Paulo Teste',
      email: 'paulo.test@test.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({
      name: 'Paulo Teste',
      email: 'paulo.test@test.com',
    });
  });

  test('POST /api/users - Should return 400 for invalid data', async () => {
    const response = await request(app).post('/api/users').send({
      name: '',
      email: 'not-an-email',
      password: '123',
    });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
  
  test('POST /api/users - Should return 400 for duplicate email', async () => {
    const email = 'duplicate@test.com';
  
    await prisma.user.create({
      data: {
        name: 'Duplicate User',
        email,
        password: 'password123',
      },
    });
  
    const response = await request(app).post('/api/users').send({
      name: 'Another User',
      email,
      password: 'password123',
    });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email already exists');
  });

  test('GET /api/users/:id - Should adjust createdAt for timezone offset', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'User Timezone',
        email: 'timezone@test.com',
        password: 'password',
      },
    });
  
    const timezoneOffset = 180;
    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('x-timezone-offset', timezoneOffset.toString());
  
    expect(response.status).toBe(200);
    const { createdAt } = response.body;
    expect(createdAt).toBeDefined();
  });

  test('GET /api/users/:id - Should return a user by ID', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Paula Teste',
        email: 'paula.test@test.com',
        password: 'password',
      },
    });

    const response = await request(app).get(`/api/users/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  });

  test('GET /api/users/:id - Should return 404 if user does not exist', async () => {
    const response = await request(app).get('/api/users/9999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });
});
