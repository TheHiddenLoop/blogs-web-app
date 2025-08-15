import { Bookmark, Heart, Loader, MessageCircleMore } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Comment } from '../components/Comment';
import { AddComment } from '../components/AddComment';
import { useParams } from 'react-router-dom';
import { useBlogsStore } from '../store/useBlogsStore';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '../atom/atom';

export function Artical() {
  const { id } = useParams();
  const { readBlogs } = useBlogsStore();
  const [blog, setBlog] = useState(null);
  const loader = useRecoilValue(loadingAtom);

  useEffect(() => {
    if (!id) return;

    readBlogs(id).then((fetchedBlog) => {
      if (fetchedBlog) setBlog(fetchedBlog);
    });
  }, [id]);

  function getDaysAgo(dateString) {
    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    return `${diffDays} days`;
  }

  if (!blog) {
    return <div className="flex justify-center items-center py-9">
      {loader && <Loader size={30} className={`animate-spin transition-opacity duration-300 ease-in-out ${loader ? 'opacity-100' : 'opacity-0'}`} />}
    </div>
  }

  return (
    <div className="p-4 md:px-[10%] py-8 h-full  text-gray-800">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="font-display text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-medium">{blog.author?.name}</span>
          <span className="ml-2">
            {getDaysAgo(blog.createdAt)} {getDaysAgo(blog.createdAt) === "Today" ? "posted" : "ago"}
          </span>
        </p>
        <img
          src={blog.imagepost}
          alt="Article"
          className="w-full h-full md:h-[500px] object-cover rounded-md"
        />
        <p className="text-sm leading-relaxed text-gray-700 md:text-justify mt-4">
          {blog.story}
        </p>
      </div>

      <div className="flex items-center gap-5 mb-6 text-gray-600">
        <Heart className="cursor-pointer hover:text-red-500 transition" />
        <MessageCircleMore className="cursor-pointer hover:text-blue-500 transition" />
        <Bookmark className="cursor-pointer hover:text-yellow-500 transition" />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="flex flex-col gap-4 pr-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Comment key={index} />
          ))}
        </div>
      </div>

      <AddComment />
    </div>
  );
}
