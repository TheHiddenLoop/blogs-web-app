import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, FileImage, Loader2, Loader } from "lucide-react";
import { useBlogsStore } from "../store/useBlogsStore";
import { loadingAtom } from "../atom/atom";
import {  useRecoilValue } from "recoil";

export function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    story: "",
    imagepost: null, 
  });

  const loading = useRecoilValue(loadingAtom);

  const { publishBlogs } = useBlogsStore();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        console.error("Only PNG, JPG, JPEG, WEBP files are allowed.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          imagepost: reader.result,
        }));
      };
      reader.onerror = () => {
        toast.error("Failed to read image file.");
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      title: formData.title,
      category: formData.category,
      tags: formData.tags,
      story: formData.story,
      image: formData.imagepost,
    };

    try {
      const isCreated = await publishBlogs(dataToSend);
    } catch (error) {
      console.error("Blog creation failed", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:px-[3%] text-gray-800 mx-auto p-4 gap-8 h-auto md:min-h-[calc(100vh-69px)]">
      <form onSubmit={handleSubmit} className="flex-1 space-y-4">
        <h1 className="text-2xl font-semibold">Create your blogs</h1>

        <input
          type="text"
          placeholder="Enter a title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Enter a category..."
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Add hashtags (comma-separated)..."
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Write your blog story"
          value={formData.story}
          onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          className="w-full p-2 border rounded h-72 md:h-44 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl w-full h-24 cursor-pointer flex flex-col items-center justify-center gap-2 transition 
          ${isDragActive ? "bg-gray-100 border-blue-400" : "bg-white border-gray-300"}`}
        >
          <input {...getInputProps()} />
          <ImagePlus className="text-gray-400 w-8 h-8" />
          <p className="text-gray-500 text-center text-sm">
            Drag & drop or click to choose an image
          </p>
          {formData.imagepost && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileImage size={16} />
              <span>Image selected</span>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center items-center">
          <button
          type="submit"
          className="bg-blue-600 text-white mt-2 w-[80%] md:w-[50%] flex justify-center items-center gap-1   py-2 rounded hover:bg-blue-700 transition-transform duration-300 hover:scale-110"
        >
          {loading && <Loader className="inline size-5 animate-spin" />}
          {loading ? "Publishing..." : "Publish"}
        </button>
        </div>
      </form>

      <div className="hidden md:flex flex-1 justify-center items-start h-[400px] w-[400px]">
        <img
          src="/images/logos.png"
          alt="blog illustration"
          className="max-w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
