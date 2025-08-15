import { axiosInstance } from "../libs/axios";
import { blogAtom, loadingAtom } from "../atom/atom";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";

export function useBlogsStore() {
  const setBlog = useSetRecoilState(blogAtom);
  const setLoading = useSetRecoilState(loadingAtom); 

  const publishBlogs = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/blogs/newpost", formData);
      setBlog(prev => [...prev, res.data.posts]); 
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

  return { publishBlogs, allBlogs, readBlogs };
}
