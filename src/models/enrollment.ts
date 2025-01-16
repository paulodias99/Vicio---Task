import prisma from '../config/prisma';

export type EnrollmentData = {
  userId: number;
  courseId: number;
  enrolledAt?: Date;
};

const EnrollmentModel = {
  async create(data: EnrollmentData) {
    return prisma.enrollment.create({ data });
  },

  async findByUserId(userId: number) {
    return prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
    });
  },
};

export default EnrollmentModel;