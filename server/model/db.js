import mongoose, { Schema } from "mongoose";

const blogsSchema = new Schema(
  {
    title: { type: String },
    story: { type: String },
    category: { type: String, lowercase: true },
    tags: { type: String },
    imagepost: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  }
);


const commentSchema = new Schema(
  {
    postid:{type: Schema.Types.ObjectId, ref:"blogs"},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true, trim: true, minlength: 2, maxlength: 500}
  },
    {timestamps:true}
)

export const commentModel=mongoose.model("comments",commentSchema);
export const blogsModel = mongoose.model("blogs", blogsSchema);
