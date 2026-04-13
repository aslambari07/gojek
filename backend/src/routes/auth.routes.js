import { Router } from "express";
import { forgotPassword, login, register, sendOtp, verifyOtp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);
router.post("/forgot-password", forgotPassword);

export default router;
