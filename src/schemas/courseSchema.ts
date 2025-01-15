import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    hours: z.number().positive('Hours must be a positive number'),
});