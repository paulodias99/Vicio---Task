import { Prisma } from '@prisma/client';

export interface Course extends Prisma.CourseCreateInput {
    id: number;
    title: string;
    description: string;
    hours: number;
    createdAt: Date;
}