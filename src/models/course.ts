import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";

export type CourseData = Prisma.CourseCreateInput;

const CourseModel = {
  async create(data: CourseData) {
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

  async update(id: number, data: Partial<CourseData>) {
    return prisma.course.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.course.delete({
      where: { id },
    });
  },
};

export default CourseModel;
