import { Router } from "express";
import { createUser, getUserById } from "../controllers/userController";
import validateSchema from "../middlewares/validateSchema";
import { createUserSchema, getUserByIdSchema } from "../schemas/userSchema";

const router = Router();

router.post("/users", validateSchema(createUserSchema), createUser);
router.get("/users/:id", validateSchema(getUserByIdSchema), getUserById);

export default router;