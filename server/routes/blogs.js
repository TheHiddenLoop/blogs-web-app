import { Router } from "express";
import { blogPost, commentsBlogs, deleteBlog, filterBlogs, getAllPosts, getBlogLikesStatus, getComments, likeBlog, readBlogs, userBlogs } from "../controllers/blogAuth.js";
import { protectRoute } from "../middleware/middleAuth.js";


export const blogsRoutes = Router();

blogsRoutes.post("/newpost",protectRoute, blogPost);
blogsRoutes.get("/allblogs",protectRoute, getAllPosts);
blogsRoutes.get("/readpost/:id",protectRoute, readBlogs);
blogsRoutes.get("/filterblogs",protectRoute, filterBlogs);
blogsRoutes.get("/userblogs",protectRoute, userBlogs);
blogsRoutes.post("/comment",protectRoute, commentsBlogs);
blogsRoutes.get("/allcomments/:id",protectRoute, getComments);
blogsRoutes.post("/likeblog/:id",protectRoute, likeBlog);
blogsRoutes.delete("/deleteblogs/:id", protectRoute, deleteBlog); 
blogsRoutes.get("/likes-status/:id", protectRoute, getBlogLikesStatus);

//commentsBlogs
//getComments
//likeComment  