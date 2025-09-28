import { Router } from "express";
import {
	signup,
	signin,
	signout,
	forgotPassword,
	resetPassword,
	refreshToken,
	getCurrentUser,
} from "../controllers/auth";
import { authenticateToken } from "../middleware/auth/authenticateToken";
import {
	validateSignup,
	validateSignin,
	validateForgotPassword,
} from "../middleware/validation";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);
router.post("/signout", signout);
router.post("/forgot-password", validateForgotPassword, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
