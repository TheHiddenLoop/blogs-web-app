import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { blogsRoutes } from "./routes/blogs.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import signupRouter from "./routes/user.js"

dotenv.config();
const app=express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true              
}));

app.use("/api/blogs",blogsRoutes);
app.use("/api/auth", signupRouter);



app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}=> http://localhost:${process.env.PORT}`);
})