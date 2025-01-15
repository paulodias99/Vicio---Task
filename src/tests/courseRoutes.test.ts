import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.course.deleteMany();
});

describe('Course Routes', () => {
  test('POST /api/courses - Should create a course', async () => {
    const response = await request(app).post('/api/courses').send({
      title: 'Introduction to TypeScript',
      description: 'Learn TypeScript from scratch.',
      hours: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({
      title: 'Introduction to TypeScript',
      description: 'Learn TypeScript from scratch.',
      hours: 10,
    });
  });

  test('GET /api/courses - Should list all courses', async () => {
    const course = await prisma.course.create({
      data: {
        title: 'Advanced Node.js',
        description: 'Learn advanced Node.js concepts.',
        hours: 15,
      },
    });

    const response = await request(app).get('/api/courses');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      id: course.id,
      title: course.title,
      description: course.description,
      hours: course.hours,
      createdAt: course.createdAt.toISOString(),
    });
  });
});
