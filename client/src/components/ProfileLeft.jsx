import { Camera } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js"
import { useRecoilValue } from "recoil";
import { authLoadingState } from "../atom/atoms.js";
import { toast } from "react-hot-toast"
import { SocialIcon } from "./SocialIcon.jsx";

export function ProfileLeft(props) {
  const [selectedImg, setSelectedImg] = useState(null);
  const isUpdating = useRecoilValue(authLoadingState);
  const { updateProfile } = useAuthStore();


  const icons = [
    { icon: "/images/icons8-facebook-50.png", link: props.facebook, name:"Facebook" },
    { icon: "/images/icons8-instagram-50.png", link: props.instagram, name:"Instagram" },
    { icon: "/images/icons8-twitter-50.png", link: props.twitter, name:"Twitter" },
    { icon: "/images/icons8-linkedin-50.png", link: props.linkedin, name:"Linkedin" },
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Please upload a PNG, JPG, or WEBP image."
      );
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      try {
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile picture updated successfully");
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[134px] w-[134px] rounded-full border-[3px] border-blue-600 overflow-hidden">
        <img
          src={selectedImg || props.profilepic || "/images/user.png"}
          alt="Profile"
          className="h-[130px] w-[130px] object-cover rounded-full"
        />

        <label
          htmlFor="avatar-upload"
          className={`absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 cursor-pointer transition-transform duration-300 hover:scale-105 ${isUpdating ? "animate-pulse pointer-events-none" : ""
            }`}
        >
          <Camera className="w-5 h-5 text-white" />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdating}
          />
        </label>
      </div>

      <h2 className="font-display text-3xl font-bold my-2">{props.name}</h2>

      <p className="text-sm leading-relaxed text-gray-700 md:text-justify mt-4">
        {props.about || "I am active blogger"}
      </p>

      <div className="flex gap-4 mt-8">
        {icons.map((val, i) => (
          <SocialIcon key={i} icon={val.icon} link={val.link} name={val.name} />
        ))}
      </div>
    </div>
  );
}
