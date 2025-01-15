import prisma from '../config/prisma';
import { Course } from '../models/course';

export const createCourse = async (data: Omit<Course, 'id' | 'createdAt'>): Promise<Course> => {
  const course = await prisma.course.create({
    data,
  });

  return course;
};

export const listCourses = async (): Promise<Course[]> => {
  const courses = await prisma.course.findMany();
  return courses;
};


export default { createCourse, listCourses };
