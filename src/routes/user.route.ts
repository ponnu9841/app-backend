import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
// import { validateData } from "../utils/validationMiddleware";
// import { userRegistrationSchema, userUpdationSchema } from "../validation/validation";

const router = Router();

router.get("/me", authMiddleware, UserController.getUser);
router.put("/", authMiddleware, UserController.updateUser);

export default router;