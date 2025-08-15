import React, { useState } from "react";

export function AddComment() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    console.log("Submitted comment:", comment);
    setComment("");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="https://t4.ftcdn.net/jpg/05/11/55/89/360_F_511558939_ydD0Jfnj5wDgHSnQr7TwCIcpYVNyqTK7.jpg"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="self-end mt-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-transform duration-300 hover:scale-110"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}
