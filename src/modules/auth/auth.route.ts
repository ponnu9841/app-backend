import { Router } from "express";
import * as AuthController from "./auth.controller";
import { loginSchema, registrationSchema } from "./auth.schema";
import { validateRequestBody } from "@/middlewares/validation";

const router = Router();

router.post("/login", validateRequestBody(loginSchema), AuthController.login);
router.post("/register", validateRequestBody(registrationSchema), AuthController.register);

export default router;