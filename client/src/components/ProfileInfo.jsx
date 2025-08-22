import { useState } from "react";
import { useRecoilValue } from "recoil"
import { Loader2 } from 'lucide-react';

import { useAuthStore } from "../store/useAuthStore";
import { userDataAtom } from "../atom/atom";
import { authLoadingState } from "../atom/atoms";
export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const data = useRecoilValue(userDataAtom);
  const { updateProfileInfo } = useAuthStore();
  const loading = useRecoilValue(authLoadingState);


  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
    about: data.about,
    location: data.location,
    facebook: data.facebook,
    instagram: data.instagram,
    twitter: data.twitter,
    linkedin: data.linkedin
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfileInfo(formData);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              readOnly={!isEditing}
              className={`pl-3 pr-3 py-2.5 w-full border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm
              ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              readOnly
              className="pl-3 pr-3 py-2.5 w-full border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              About
            </label>
            <input
              id="about"
              type="text"
              placeholder="Tell something about yourself"
              value={formData.about}
              onChange={(e) => handleChange("about", e.target.value)}
              readOnly={!isEditing}
              className={`pl-3 pr-3 py-2.5 w-full border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm
              ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Enter your location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              readOnly={!isEditing}
              className={`pl-3 pr-3 py-2.5 w-full border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm
              ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Social Media Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            {[
              {
                name: "facebook",
                label: "Facebook",
                icon: "/images/icons8-facebook-50.png",
                color: "blue-500"
              },
              {
                name: "instagram",
                label: "Instagram",
                icon: "/images/icons8-instagram-50.png",
                color: "pink-500"
              },
              {
                name: "twitter",
                label: "Twitter",
                icon: "/images/icons8-twitter-50.png",
                color: "sky-500"
              },
              {
                name: "linkedin",
                label: "LinkedIn",
                icon: "/images/icons8-linkedin-50.png",
                color: "blue-700"
              }
            ].map(({ name, label, icon, color }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <div className="relative flex items-center">
                  <img
                    src={icon}
                    alt={name}
                    className="w-6 h-6 absolute left-3"
                  />
                  <input
                    id={name}
                    type="url"
                    placeholder={`Enter ${label} URL`}
                    value={formData[name]}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange(name, e.target.value)}
                    className={`pl-12 pr-3 py-2.5 w-full border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-${color} 
                    focus:border-transparent transition-all text-sm ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-5">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
          text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
          text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm"
          >
            {isEditing ? "Disable Editing" : "Enable Editing"}
          </button>
        </div>
      </form>
    </div>
  );
}
