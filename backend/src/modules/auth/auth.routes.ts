import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { loginSchema, registerSchema } from "./auth.types.js";
import { loginHandler, registerHandler, logoutHandler } from "./auth.controller.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), loginHandler);
router.post("/register", validateRequest(registerSchema), registerHandler);
router.post("/logout", logoutHandler);

export const authRoutes = router;
