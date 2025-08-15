import jwt from "jsonwebtoken";
import User from "../model/userDb.js";
import rateLimit from 'express-rate-limit';


export async function protectRoute(req, res, next){
  try {
    const token = req.cookies.jwt;    

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message, error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const validatePassword = (req, res, next) => {
  const { password } = req.body;

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters and include letters, numbers, and special characters.",
    });
  }

  next();
};



export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    status: 429,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
