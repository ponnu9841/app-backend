import { Router } from "express";
import * as AuthController from "./auth.controller";
import { loginSchema, registrationSchema } from "./auth.schema";
import { validateData } from "@/utils/validationMiddleware";

const router = Router();

router.post("/login", validateData(loginSchema), AuthController.login);
router.post("/register", validateData(registrationSchema), AuthController.register);

export default router;