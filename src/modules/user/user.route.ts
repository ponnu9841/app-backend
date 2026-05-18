import { Router } from "express";
import * as UserController from "./user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { userUpdateSchema } from "./user.schema";
import { validateRequestBody } from "@/middlewares/validation";

const router = Router();

router.get("/me", authMiddleware, UserController.getUser);
router.put(
	"/",
	authMiddleware,
	validateRequestBody(userUpdateSchema),
	UserController.updateUser,
);

export default router;
