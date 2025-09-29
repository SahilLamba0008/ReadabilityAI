import { Router } from "express";
import {
	signup,
	signin,
	signout,
	forgotPassword,
	refreshToken,
	getCurrentUser,
} from "../controllers/auth";

export const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/forgot-password", forgotPassword);
router.post("/refresh-token", refreshToken);
router.get("/me", getCurrentUser);
