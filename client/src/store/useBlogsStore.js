import { axiosInstance } from "../libs/axios";
import {
  blogAtom,
  commentAtom,
  isLikeAtom,
  likeAtom,
  loadingAtom,
} from "../atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import toast from "react-hot-toast";

export function useBlogsStore() {
  const setBlog = useSetRecoilState(blogAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const setComment = useSetRecoilState(commentAtom);
  const setLike = useSetRecoilState(likeAtom);
  const setIsLike = useSetRecoilState(isLikeAtom);

  const publishBlogs = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/blogs/newpost", formData);
      setBlog((prev) => [...prev, res.data.posts]);
      toast.success(res.data.message);
      return res.data.posts;
    } catch (err) {
      toast.error(err.response?.data?.message || "Blog publish failed");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const allBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/blogs/allblogs");
      setBlog(res.data.blog);
    } catch (err) {
      toast.error(err.response?.data?.message || "Fetching blogs failed");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const readBlogs = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/blogs/readpost/${id}`);
      setBlog(res.data.blog);

      return res.data.blogs;
    } catch (err) {
      toast.error(err.response?.data?.message || "Reading blog failed");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = async (type, search) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/blogs/filterblogs?${type}=${search}`
      );
      setBlog(res.data.blogs);
      return res.data.blogs;
    } catch (err) {
      toast.error(err.response?.data?.message || "Reading blog failed");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const userBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/blogs/userblogs");
      setBlog(res.data.blogs);
    } catch (err) {
      toast.error(err.response?.data?.message || "Fetching blogs failed");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogs = async (id) => {
    try {
      const res = await axiosInstance.delete("/blogs/deleteblogs/" + id);

      // UI se turant hatao
      setBlog((prev) => prev.filter((blog) => blog._id !== id));

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Deleting blogs failed");
      console.error(err);
      throw err;
    }
  };

  const sendComments = async (formData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/blogs/comment", formData);
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchComment = async (id) => {
    try {
      const res = await axiosInstance.get("/blogs/allcomments/" + id);
      setComment(res.data.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const likeBlogs = async (id) => {
    try {
      const res = await axiosInstance.post(`/blogs/likeblog/${id}`);
      console.log(res.data);
      setLike(res.data.likesCount);
      setIsLike(res.data.isLiked);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const allLike = async (id) => {
    try {
      const res = await axiosInstance.get(`/blogs/likes-status/${id}`);
      setLike(res.data.likesCount);
      setIsLike(res.data.isLiked);
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    publishBlogs,
    allBlogs,
    readBlogs,
    filterBlogs,
    userBlogs,
    deleteBlogs,
    sendComments,
    fetchComment,
    likeBlogs,
    allLike
  };
}
