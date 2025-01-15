import prisma from '../config/prisma';

const create = async (data: { userId: number; courseId: number }) => {
  return prisma.enrollment.create({
    data,
  });
};

const findByUserId = async (userId: number) => {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        select: {
            title: true
        }
      },
    },
  });
};

export default { create, findByUserId };
