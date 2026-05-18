import { Router } from "express";
import userRoutes from "@/modules/user/user.route"
import authRoutes from "@/modules/auth/auth.route"

const router = Router();

router.get("/health", (_req, res) => {
    res.status(200).json("Health route working properly")
})

router.use("/users", userRoutes)
router.use("/auth", authRoutes)


export default router;