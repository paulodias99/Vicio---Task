import { z } from "zod";

export const enrollmentSchema = z.object({
  userId: z
    .number({ required_error: "User ID must be provided", invalid_type_error: "User ID must be a number" })
    .int("User ID must be an integer")
    .positive("User ID must be a positive integer"),
  courseId: z
    .number({ required_error: "Course ID must be provided", invalid_type_error: "Course ID must be a number" })
    .int("Course ID must be an integer")
    .positive("Course ID must be a positive integer"),
});
