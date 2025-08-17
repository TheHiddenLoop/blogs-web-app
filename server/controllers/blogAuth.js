import { blogsModel } from "../model/db.js";
import { cloudinary } from "../lib/cloudinary.js";
import User from "../model/userDb.js";

export async function blogPost(req, res) {
  try {
    const { title, story, category, tags, image } = req.body;    
    const loggedInUserId =  req.user._id;

    if (!image) {
      return res.status(400).json({ success: false, message: "No image provided." });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);

    const posts = await blogsModel.create({
      title,
      story,
      category,
      tags,
      imagepost: uploadResponse.secure_url,
      author: loggedInUserId,
    });

    res.json({ success: true, message: "Blog post created successfully!", posts });
  } catch (error) {
    console.error("Error in blogPost:", error);
    res.status(500).json({ success: false, message: "Failed to create blog post." });
  }
}



export async function getAllPosts(req, res) {
    try {
        //.populate('author', '-password -email');
        const blogs = await blogsModel.find({}).populate('author', '-password -email');
        res.json({ success: true, message: "Blogs fetched", blog: blogs });
    } catch (error) {
        console.error("Error in updatePosts:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export async function readBlogs(req, res) {
    try {
        const id =req.params.id;

        const blogs = await blogsModel.findById({ _id: id }).populate('author', '-password -email');
        if (!blogs) {
            return res.json({ success: false, message: "No blogs related to this post" });
        }
        res.json({ success: true, message: "Post are fetched", blogs });

    } catch (error) {
        console.error("Error in read post:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}


export const filterBlogs = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; 
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category.toLowerCase();
    }

    const blogs = await blogsModel
      .find(query)
      .populate("author", "-password -email");

    res.json({
      success: true,
      message: blogs.length
        ? "Filtered blogs fetched successfully"
        : "No blogs found with given filters",
      blogs,
    });
  } catch (error) {
    console.error("Error in filterBlogs:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const userBlogs = async (req, res) => {
  try {
    const id = req.user._id;

    const blogs = await blogsModel.find({ author: id }).populate("author", "-password -email -otp -otpExpires -resetPasswordToken -resetPasswordExpires -createdAt -updatedAt -isVerified ");

    if (!blogs.length) {
      return res.json({ success: false, message: "No blogs found for this user" });
    }

    res.json({ success: true, message: "User blogs fetched successfully", blogs });
  } catch (error) {
    console.error("Error in userBlogs:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


export const deleteBlog=async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await blogsModel.findOneAndDelete({ _id: id, author: userId });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found or not authorized" });
    }

    res.json({ success: true, message: "Blog deleted successfully", blog });
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}