import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

export type UserData = {
  name: string;
  email: string;
  password: string;
};

const UserModel = {
  async create(data: UserData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  },

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findAll() {
    return prisma.user.findMany();
  },
};

export default UserModel;