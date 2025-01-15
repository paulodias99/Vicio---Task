import prisma from '../config/prisma';

const CourseRepository = {
  async create(data: { title: string; description: string; hours: number }) {
    return prisma.course.create({ data });
  },

  async findById(id: number) {
    return prisma.course.findUnique({
      where: { id },
    });
  },

  async findAll() {
    return prisma.course.findMany();
  },
};

export default CourseRepository;
