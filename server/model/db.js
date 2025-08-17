import mongoose, { Schema } from "mongoose";

const blogsSchema = new Schema(
  {
    title: { type: String },
    story: { type: String },
    category: { type: String, lowercase: true },
    tags: { type: String },
    imagepost: String,
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

export const blogsModel = mongoose.model("blogs", blogsSchema);
