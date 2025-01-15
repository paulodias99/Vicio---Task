import { Router } from "express";
import { createEnrollment, getEnrollmentsByUserId } from "../controllers/enrollmentController";
import validateSchema from "../middlewares/validateSchema";
import { enrollmentSchema } from "../schemas/enrollmentValidation";

const router = Router();

router.post("/enrollments", validateSchema(enrollmentSchema), createEnrollment);
router.get("/enrollments/:userId", getEnrollmentsByUserId);

export default router;
