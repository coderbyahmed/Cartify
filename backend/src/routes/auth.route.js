import express from "express";

import register from "../controllers/auth/register.controller.js";
import login from "../controllers/auth/login.controller.js";
import validateMiddleware from "../middlewares/validation.middleware.js";
import profile from "../controllers/auth/profile.controller.js"
import verifyTokenMiddleware from "../middlewares/auth.middleware.js"
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validateMiddleware(registerSchema), register);
router.post("/login", validateMiddleware(loginSchema), login);
router.get("/profile", verifyTokenMiddleware, profile);

export default router;