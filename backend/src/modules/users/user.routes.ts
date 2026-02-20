import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { me } from "./user.controller.js";

const router = Router();

router.get("/me", authMiddleware, me);

export const userRoutes = router;
