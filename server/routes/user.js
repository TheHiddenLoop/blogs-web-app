import { Router } from "express";
import {
  login,
  signup,
  checkAuth,
  verifyOtp,
  requestPasswordReset,
  resetPassword,
  logout,
} from "../controllers/authController.js";
import {
  protectRoute,
  validatePassword,
  loginRateLimiter,
} from "../middleware/middleAuth.js";

const signupRouter = Router();

signupRouter.post("/signup", signup);
signupRouter.post("/login", loginRateLimiter, login);
signupRouter.post("/verify/otp", verifyOtp);
signupRouter.get("/check", protectRoute, checkAuth);
signupRouter.post("/reset/password", requestPasswordReset);
signupRouter.post("/reset-password", validatePassword, resetPassword);
signupRouter.post("/logout", protectRoute, logout);


export default signupRouter;
