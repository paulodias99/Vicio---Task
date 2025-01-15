import prisma from '../config/prisma';

export default {
  async createUser(data: { name: string; email: string; password: string }) {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
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
