import prisma from '../config/prisma';

export default {
  async createUser(data: { name: string; email: string; password: string }) {
    return prisma.user.create({
      data,
    });
  },

  async findUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findAllUsers() {
    return prisma.user.findMany();
  },
};
