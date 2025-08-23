import { useState, useEffect } from "react";
import { X, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import { useBlogsStore } from "../store/useBlogsStore";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "../atom/atom";

export function EditModel({ isOpen, onClose, initialData }) {
  const { updateBlog } = useBlogsStore(); 
  const loading = useRecoilValue(loadingAtom)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    story: "",
    image: null,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        tags: initialData.tags || "",
        story: initialData.story || "",
        image: initialData.imagepost || null,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Invalid file type. Please upload PNG, JPG, JPEG, WEBP.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(initialData._id, formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[50%] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>

        <div className="relative flex h-[134px] w-[134px] rounded-xl border-2 border-dashed border-gray-300 overflow-hidden mb-6 mx-auto">
          <img
            src={formData.image || "/images/blog-placeholder.png"}
            alt="Blog cover"
            className="h-full w-full object-cover"
          />

          <label
            htmlFor="blog-image-upload"
            className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              id="blog-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter a title..."
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Enter a category..."
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Add hashtags (comma-separated)..."
            value={formData.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Write your blog story"
            value={formData.story}
            onChange={(e) => handleChange("story", e.target.value)}
            className="w-full p-2 border rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white w-[70%] py-2 rounded hover:bg-blue-700 transition-transform duration-300 hover:scale-105 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
