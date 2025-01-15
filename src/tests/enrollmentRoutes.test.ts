import request from "supertest";
import app from "../app";
import prisma from "../config/prisma";

process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
});

describe("Enrollment Routes", () => {
  test("POST /api/enrollments - Should create an enrollment", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Paulo Teste",
        email: "paulotest@teste.com",
        password: "123456",
      },
    });

    const course = await prisma.course.create({
      data: {
        title: "Test Course",
        description: "A test course",
        hours: 10,
      },
    });

    const response = await request(app).post("/api/enrollments").send({
      userId: user.id,
      courseId: course.id,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toMatchObject({
      userId: user.id,
      courseId: course.id,
    });
  });

  test("POST /api/enrollments - Should return 400 for invalid data", async () => {
    const response = await request(app).post("/api/enrollments").send({
      userId: "not_a_number",
      courseId: -1,
    });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "User ID must be a number" }),
        expect.objectContaining({ message: "Course ID must be a positive integer" }),
      ])
    );
  });  

  test("GET /api/enrollments/:userId - Should list user enrollments", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Paulo Teste",
        email: "paulotest@teste.com",
        password: "123456",
      },
    });

    const course = await prisma.course.create({
      data: {
        title: "Test Course",
        description: "A test course",
        hours: 10,
      },
    });

    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });

    const timezoneOffset = -180;
    const response = await request(app)
      .get(`/api/enrollments/${user.id}`)
      .set("x-timezone-offset", timezoneOffset.toString());

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        hours: course.hours,
      },
    });
  });
});
