import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { blogsRoutes } from "./routes/blogs.js";
import signupRouter from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);

app.use("/api/blogs", blogsRoutes);
app.use("/api/auth", signupRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} => http://localhost:${PORT}`);
});
