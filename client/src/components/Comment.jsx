import React from 'react';

export function Comment({ userProfile, name, createdAt, comment }) {

  function getDaysAgo(dateString) {
    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    return `${diffDays} days`;
  }


  return (
    <div className="flex items-start gap-4 py-4">
      <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-600">
        <img
          src={userProfile?userProfile:"/images/user.png"}
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800">
          {name} <span className="text-xs font-normal text-gray-500 ml-2">{getDaysAgo(createdAt)} {getDaysAgo(createdAt) === "Today" ? "posted" : "ago"}</span>
        </p>
        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
          {comment}
        </p>
      </div>
    </div>
  );
}
