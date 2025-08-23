import { Bookmark, Heart, Loader, MessageCircleMore } from "lucide-react"
import { useEffect, useState } from "react"
import { Comment } from "../components/Comment"
import { AddComment } from "../components/AddComment"
import { useParams } from "react-router-dom"
import { useBlogsStore } from "../store/useBlogsStore"
import { useRecoilValue } from "recoil"
import { commentAtom, isLikeAtom, likeAtom, loadingAtom, saveBlogAtom } from "../atom/atom"

export function Artical() {
  const { id } = useParams()
  const { readBlogs, fetchComment, likeBlogs, allLike, saveBlogs, allSavedBlogs } = useBlogsStore()
  const [blog, setBlog] = useState(null)
  const loader = useRecoilValue(loadingAtom)
  const commentData = useRecoilValue(commentAtom)
  const likes = useRecoilValue(likeAtom)
  const isLiked = useRecoilValue(isLikeAtom)
  const bookmark = useRecoilValue(saveBlogAtom)

  useEffect(() => {
    if (!id) return

    readBlogs(id).then((fetchedBlog) => {
      if (fetchedBlog) setBlog(fetchedBlog)
    })
  }, [id])

  useEffect(() => {
    fetchComment(id)
    allLike(id)
    allSavedBlogs()
  }, [id])

  async function handleLike() {
    try {
      await likeBlogs(id)
    } catch (err) {
      console.error("Error liking blog:", err)
    }
  }

  async function handleSave() {
    try {
      await saveBlogs(id)
    } catch (err) {
      console.error("Error liking blog:", err)
    }
  }

  function getDaysAgo(dateString) {
    const createdDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - createdDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    return `${diffDays} days`
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center py-9">
        {loader && (
          <Loader
            size={30}
            className={`animate-spin transition-opacity duration-300 ease-in-out ${loader ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
    )
  }

  return (
    <div className="p-4 md:px-[3%] py-8 min-h-screen overflow-y-auto text-gray-800">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="font-display text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-medium">{blog.author?.name}</span>
          <span className="ml-2">
            {getDaysAgo(blog.createdAt)} {getDaysAgo(blog.createdAt) === "Today" ? "posted" : "ago"}
          </span>
        </p>
        <img
          src={blog.imagepost || "/placeholder.svg"}
          alt="Article"
          className="w-full h-full md:h-[500px] object-cover rounded-md"
        />
        <p className="text-sm leading-relaxed text-gray-700 md:text-justify mt-4">{blog.story}</p>
      </div>

      <div className="flex items-center gap-5 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <span>{likes}</span>
          <Heart
            onClick={handleLike}
            className={`cursor-pointer transition 
      ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <span>{commentData.length}</span>
          <MessageCircleMore className="cursor-pointer hover:text-blue-500 transition" />
        </div>

        <Bookmark
          className={`cursor-pointer transition 
    ${
      bookmark.isSaved && bookmark.savedBlogs?.some((blog) => blog._id === id)
        ? "text-red-500 fill-red-500"
        : "text-gray-600 hover:text-red-500"
    }`}
          onClick={handleSave}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="border-t border-gray-200 mb-4"></div>
        <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="flex flex-col gap-4 pr-2">
            {commentData.map((val) => (
              <Comment
                key={val._id}
                userProfile={val.user?.profilepic}
                name={val.user?.name}
                createdAt={val.createdAt}
                comment={val.comment}
              />
            ))}
          </div>
        </div>
      </div>

      <AddComment postId={blog._id} />
    </div>
  )
}
