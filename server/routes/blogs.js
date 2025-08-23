import { Router } from "express";
import { blogPost, commentsBlogs, deleteBlog, deleteSavedBlog, filterBlogs, getAllPosts, getBlogLikesStatus, getComments, getSavedBlogs, likeBlog, readBlogs, toggleSaveBlog, updateBlog, userBlogs } from "../controllers/blogAuth.js";
import { protectRoute } from "../middleware/middleAuth.js";


export const blogsRoutes = Router();

blogsRoutes.post("/newpost",protectRoute, blogPost);
blogsRoutes.put("/update/:id",protectRoute, updateBlog);
blogsRoutes.get("/allblogs",protectRoute, getAllPosts);
blogsRoutes.get("/readpost/:id",protectRoute, readBlogs);
blogsRoutes.get("/filterblogs",protectRoute, filterBlogs);
blogsRoutes.get("/userblogs",protectRoute, userBlogs);
blogsRoutes.post("/comment",protectRoute, commentsBlogs);
blogsRoutes.get("/allcomments/:id",protectRoute, getComments);
blogsRoutes.post("/likeblog/:id",protectRoute, likeBlog);
blogsRoutes.delete("/deleteblogs/:id", protectRoute, deleteBlog); 
blogsRoutes.get("/likes-status/:id", protectRoute, getBlogLikesStatus);
blogsRoutes.put('/:id/save', protectRoute, toggleSaveBlog);
blogsRoutes.get('/saved/blogs', protectRoute, getSavedBlogs);
blogsRoutes.delete('/delete/:id/save', protectRoute, deleteSavedBlog);


//updateBlog
//commentsBlogs
//getComments
//likeComment  