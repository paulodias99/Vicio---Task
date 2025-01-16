import { Request } from "express";

export interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface CreateCourseRequest extends Request {
  body: {
    title: string;
    description: string;
    hours: number;
  };
}

export interface CreateEnrollmentRequest extends Request {
  body: {
    userId: number;
    courseId: number;
  };
}