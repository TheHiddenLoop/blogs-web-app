import { Router } from "express";
import { blogPost, deleteBlog, filterBlogs, getAllPosts, readBlogs, userBlogs } from "../controllers/blogAuth.js";
import { protectRoute } from "../middleware/middleAuth.js";


export const blogsRoutes = Router();

blogsRoutes.post("/newpost",protectRoute, blogPost);
blogsRoutes.get("/allblogs",protectRoute, getAllPosts);
blogsRoutes.get("/readpost/:id",protectRoute, readBlogs);
blogsRoutes.get("/filterblogs",protectRoute, filterBlogs);
blogsRoutes.get("/userblogs",protectRoute, userBlogs);
blogsRoutes.delete("/deleteblogs/:id", protectRoute, deleteBlog); 