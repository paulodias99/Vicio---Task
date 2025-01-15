import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

beforeAll(async () => {
  await prisma.$connect();
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();
  await prisma.enrollment.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.enrollment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();
});

describe('Enrollment Routes', () => {
  test('POST /api/enrollments - Should create an enrollment', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
    });

    const course = await prisma.course.create({
      data: {
        title: 'Introduction to Node.js',
        description: 'Learn Node.js basics.',
        hours: 10,
      },
    });

    const response = await request(app).post('/api/enrollments').send({
      userId: user.id,
      courseId: course.id,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject({
      userId: user.id,
      courseId: course.id,
    });
  });

  test('GET /api/enrollments/:userId - Should list user enrollments with course title only', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      },
    });

    const course = await prisma.course.create({
      data: {
        title: 'Advanced TypeScript',
        description: 'Learn advanced TypeScript concepts.',
        hours: 15,
      },
    });

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });

    const response = await request(app).get(`/api/enrollments/${user.id}`).set('x-timezone-offset', '180');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      id: enrollment.id,
      userId: user.id,
      courseId: course.id,
      course: {
        title: course.title,
      },
    });
  });

  test('GET /api/enrollments/:userId - Should return empty array for user without enrollments', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'No Enrollments',
        email: 'no.enrollments@example.com',
        password: 'password123',
      },
    });

    const response = await request(app).get(`/api/enrollments/${user.id}`).set('x-timezone-offset', '180');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
