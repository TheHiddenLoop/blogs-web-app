import { blogsModel, commentModel } from "../model/db.js";
import { cloudinary } from "../lib/cloudinary.js";
import User from "../model/userDb.js";

export async function blogPost(req, res) {
  try {
    const { title, story, category, tags, image } = req.body;
    const loggedInUserId = req.user._id;

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


export async function updateBlog(req, res) {
  try {
    const { title, story, category, tags, image } = req.body;
    const { id } = req.params;

    const blog = await blogsModel.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    let updatedFields = { title, story, category, tags };

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      updatedFields.imagepost = uploadResponse.secure_url;
    }

    const updatedBlog = await blogsModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } 
    );

    res.json({
      success: true,
      message: "Blog updated successfully!",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error in updateBlog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog.",
    });
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
    const id = req.params.id;

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


export const deleteBlog = async (req, res) => {
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

export const commentsBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const { comment, postId } = req.body;

    if (!comment || !postId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await commentModel.create({
      postid: postId,
      user: userId,
      comment: comment,
    });

    res.json({ success: true, message: "Comment posted successfully." });
  } catch (error) {
    console.error("Error in commentsBlogs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await commentModel
      .find({ postid: id })
      .sort({ createdAt: -1 })
      .populate("user", "-password -email -otp -otpExpires -resetPasswordToken -resetPasswordExpires -createdAt -updatedAt -isVerified");

    if (comments.length === 0) {
      return res.status(404).json({ success: false, message: "No comments on this blog" });
    }

    res.json({ success: true, message: "Fetched comments successfully.", data: comments });
  } catch (error) {
    console.error("Error in getComments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;  
    const userId = req.user._id;  

    const blog = await blogsModel.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const alreadyLiked = blog.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    if (alreadyLiked) {
      blog.likes.pull(userId);
      await blog.save();
      return res.status(200).json({
        message: "Unliked",
        likesCount: blog.likes.length,
        isLiked: false
      });
    } else {
      blog.likes.push(userId);
      await blog.save();
      return res.status(200).json({
        message: "Liked",
        likesCount: blog.likes.length,
        isLiked: true
      });
    }
    
  } catch (error) {
    console.error("Error in likeBlog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getBlogLikesStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await blogsModel.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const isLiked = blog.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    return res.status(200).json({
      likesCount: blog.likes.length,
      isLiked
    });

  } catch (error) {
    console.error("Error in getBlogLikesStatus:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const toggleSaveBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const userId = req.user._id;

    const blog = await blogsModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadySaved = user.savedBlogs.some(
      (savedId) => savedId.toString() === blogId
    );

    if (alreadySaved) {
      user.savedBlogs.pull(blogId); // Unsave
      await user.save();
      return res.status(200).json({
        message: "Removed from saved",
        savedCount: user.savedBlogs.length,
        isSaved: false
      });
    } else {
      user.savedBlogs.push(blogId); // Save
      await user.save();
      return res.status(200).json({
        message: "Saved for later",
        savedCount: user.savedBlogs.length,
        savedBlogs:[{_id:blogId}],
        isSaved: true
      });
    }

  } catch (error) {
    console.error("Error in toggleSaveBlog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getSavedBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedBlogs', '-likes');

    const savedBlogs = user.savedBlogs || [];

    const isSaved = savedBlogs.length > 0;

    res.status(200).json({
      savedBlogs,
      isSaved
    });

  } catch (error) {
    console.error("Error in getSavedBlogs:", error);
    res.status(500).json({ message: "Failed to fetch saved blogs" });
  }
};

export const deleteSavedBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const userId = req.user._id;

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { savedBlogs: blogId } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Blog not found in saved list" });
    }

    res.status(200).json({ message: "Blog removed from saved list", isSaved: false });

  } catch (error) {
    console.error("Error in deleteSavedBlog:", error);
    res.status(500).json({ message: "Failed to remove saved blog" });
  }
};