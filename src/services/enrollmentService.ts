import EnrollmentModel, { EnrollmentData } from '../models/enrollment';
import prisma from '../config/prisma';

const createEnrollment = async (data: EnrollmentData) => {
  const { userId, courseId } = data;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) throw new Error('Course not found');

  return EnrollmentModel.create(data);
};

const getEnrollmentsByUserId = async (userId: number, timezoneOffset: number) => {
  const enrollments = await EnrollmentModel.findByUserId(userId);

  return enrollments.map((enrollment) => ({
    id: enrollment.id,
    course: {
      id: enrollment.course.id,
      title: enrollment.course.title,
      description: enrollment.course.description,
      hours: enrollment.course.hours,
    },
    enrolledAt: new Date(enrollment.enrolledAt.getTime() - timezoneOffset * 60 * 1000).toISOString(),
  }));
};

export default { createEnrollment, getEnrollmentsByUserId };
