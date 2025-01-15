import { Router } from 'express';
import { createCourse, listCourses } from '../controllers/courseController';
import validateSchema from "../middleware/validateSchema";
import { courseSchema } from "../schemas/courseSchema";

const router = Router();

router.post('/courses',  validateSchema(courseSchema), createCourse);
router.get('/courses', listCourses);

export default router;
