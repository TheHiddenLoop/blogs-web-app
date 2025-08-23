import { useEffect, useState } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { SavedBlogs } from "./SavedBlogs";
import { useBlogsStore } from "../store/useBlogsStore"
import { useRecoilValue } from "recoil";
import { saveBlogAtom } from "../atom/atom";

export default function ProfileR() {
  const [activeTab, setActiveTab] = useState("profile");
  const { allSavedBlogs, deleteSavedBlogs } = useBlogsStore();
  const bookmark = useRecoilValue(saveBlogAtom);

  useEffect(() => {
    allSavedBlogs();
  }, []);


  const handleDeleteSavedBlogs = async (id) => {
    try {
      await deleteSavedBlogs(id);
      allSavedBlogs();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="p-2">
      <div className="flex gap-4 border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-2 ${activeTab === "profile"
              ? "border-b-2 border-blue-500 font-semibold text-blue-600"
              : "text-gray-500"
            }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-2 ${activeTab === "saved"
              ? "border-b-2 border-blue-500 font-semibold text-blue-600"
              : "text-gray-500"
            }`}
        >
          Saved Blogs
        </button>
      </div>

      <div>
        {activeTab === "profile" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Profile Information</h2>

            <ProfileInfo />
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Saved Blogs</h2>
            {bookmark.savedBlogs.map((val) => (
              <div className="py-3" key={val._id}>
                <SavedBlogs image={val.imagepost} title={val.title} to={`/artical/${val._id}`} onclick={() => handleDeleteSavedBlogs(val._id)} />
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
