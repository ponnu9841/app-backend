import { Router } from "express";
import * as UserController from "./user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validateData } from "@/utils/validationMiddleware";
import { userUpdateSchema } from "./user.schema";

const router = Router();

router.get("/me", authMiddleware, UserController.getUser);
router.put(
	"/",
	authMiddleware,
	validateData(userUpdateSchema),
	UserController.updateUser,
);

export default router;
