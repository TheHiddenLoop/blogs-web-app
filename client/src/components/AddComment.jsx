import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atom/atoms";
import { useBlogsStore } from "../store/useBlogsStore";
import { loadingAtom } from "../atom/atom";
import { Loader } from "lucide-react";

export function AddComment({ postId }) {
  const [comment, setComment] = useState("");
  const data = useRecoilValue(userState);
  const loading = useRecoilValue(loadingAtom);

  const { sendComments } = useBlogsStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const formData = { postId: postId, comment: comment };
    await sendComments(formData);
    setComment("");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-600">
          <img
            src={data.profilepic?data.profilepic: "/images/user.png"}
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
            {loading && <Loader className="inline size-5 animate-spin" />}
            {loading ? "Publishing..." : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}
