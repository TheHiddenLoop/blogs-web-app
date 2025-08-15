import { Router } from "express";
import { blogPost, getAllPosts, readBlogs } from "../controllers/blogAuth.js";
import { protectRoute } from "../middleware/middleAuth.js";


export const blogsRoutes = Router();

blogsRoutes.post("/newpost",protectRoute, blogPost);
blogsRoutes.get("/allblogs",protectRoute, getAllPosts);
blogsRoutes.get("/readpost/:id",protectRoute, readBlogs);


