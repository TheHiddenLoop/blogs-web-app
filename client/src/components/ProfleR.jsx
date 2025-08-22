import { useState } from "react";
import { ProfileInfo } from "./ProfileInfo";

export default function ProfileR() {
  const [activeTab, setActiveTab] = useState("profile");

  const data = [
    { id: 1, text: "Hello Everyone" },
    { id: 2, text: "Welcome back!" }
  ];

  return (
    <div className="p-4">
      <div className="flex gap-4 border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-2 ${
            activeTab === "profile"
              ? "border-b-2 border-blue-500 font-semibold text-blue-600"
              : "text-gray-500"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-2 ${
            activeTab === "saved"
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
            <ul className="list-disc pl-5">
              {data.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
